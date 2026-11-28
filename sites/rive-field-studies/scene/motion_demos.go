package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/redriot-io/rive-go/rive"
)

type riveObject struct {
	kind   uint32
	fields []rive.Property
}

func (o riveObject) TypeKey() uint32             { return o.kind }
func (o riveObject) Properties() []rive.Property { return o.fields }

func floatField(key uint32, value float64) rive.Property {
	return rive.Property{Key: key, Type: rive.PropertyTypeFloat, Value: value}
}

func uintField(key uint32, value uint64) rive.Property {
	return rive.Property{Key: key, Type: rive.PropertyTypeUint, Value: value}
}

func updateField(o rive.Object, field rive.Property) riveObject {
	fields := append([]rive.Property(nil), o.Properties()...)
	for i, existing := range fields {
		if existing.Key == field.Key {
			fields[i] = field
			return riveObject{o.TypeKey(), fields}
		}
	}
	return riveObject{o.TypeKey(), append(fields, field)}
}

// Add a ping-pong track to the first timeline. Component IDs are relative to its artboard.
func animateProperty(objects []rive.Object, objectID, property uint64, start, end float64) []rive.Object {
	for i, object := range objects {
		if object.TypeKey() != 31 {
			continue
		}
		animation := updateField(object, uintField(57, 120))
		keyframes := []rive.Object{
			animation,
			&rive.KeyedObject{ObjectId: objectID},
			&rive.KeyedProperty{PropertyKey: property},
			riveObject{30, []rive.Property{uintField(68, 1), floatField(70, start)}},
			riveObject{30, []rive.Property{uintField(67, 120), uintField(68, 1), floatField(70, end)}},
		}
		return append(append(append([]rive.Object(nil), objects[:i]...), keyframes...), objects[i+1:]...)
	}
	return objects
}

func motionDemos(dir string) error {
	for _, name := range []string{"path", "trim", "rig", "clip", "bones", "solos"} {
		raw, err := os.ReadFile(filepath.Join("fixtures", name+".riv"))
		if err != nil {
			return err
		}
		file, err := rive.ReadBytes(raw)
		if err != nil {
			return err
		}
		objects := file.Objects
		switch name {
		case "path":
			// Animate the distance property on the FollowPathConstraint.
			objects = animateProperty(objects, 4, 363, .05, .95)
		case "trim":
			// Animate the end property on the foreground stroke's TrimPath.
			objects = animateProperty(objects, 11, 115, .05, .95)
		case "rig":
			// Use contrasting colors for the shapes that show the two bones.
			for index, color := range map[int]uint64{8: 0xFFFFB38B, 11: 0xFFC994FF} {
				objects[index] = updateField(objects[index], rive.Property{Key: 37, Type: rive.PropertyTypeColor, Value: color})
			}
			// Show the animated IK target as a marker parented to the target node.
			marker := []rive.Object{
				riveObject{3, []rive.Property{uintField(5, 1)}},
				riveObject{4, []rive.Property{uintField(5, 15), floatField(20, 28), floatField(21, 28)}},
				riveObject{20, []rive.Property{uintField(5, 15)}},
				riveObject{18, []rive.Property{uintField(5, 17), {Key: 37, Type: rive.PropertyTypeColor, Value: uint64(0xFFFDF0E7)}}},
			}
			objects = append(append(append([]rive.Object(nil), objects[:16]...), marker...), objects[16:]...)
		}
		for i, object := range objects {
			if object.TypeKey() == 31 {
				objects[i] = updateField(object, uintField(59, 2)) // Rive ping-pong playback.
			}
		}
		data, err := rive.WriteBytes(objects, rive.WithMajorVersion(file.MajorVersion), rive.WithMinorVersion(file.MinorVersion), rive.WithFileID(file.FileID))
		if err != nil {
			return fmt.Errorf("%s: %w", name, err)
		}
		if err := os.WriteFile(filepath.Join(dir, name+".riv"), data, 0644); err != nil {
			return err
		}
	}
	return nil
}
