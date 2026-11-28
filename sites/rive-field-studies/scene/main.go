// Builds Signal, the original motion scene used by the showcase.
package main

import (
	"fmt"
	"math"
	"os"

	"github.com/redriot-io/rive-go/rive/builder"
)

const width, height = 840, 650
const cx, cy = width / 2, height / 2
const segments = 108

type point struct{ x, y float64 }

func pathAt(t, lane float64) point {
	a := t * 2.59 * math.Pi
	u := 242 + 103*math.Sin(a*.62+lane*.7)
	x := math.Sin(a-.62)*u + (t-.5)*84
	y := math.Cos(a-.81)*(121+45*lane) - 85*math.Sin(2.53*t-.42) + 96*(t-.5)
	return point{x*.93 + y*.42, y*.93 - x*.42}
}

func band(ab *builder.ArtboardBuilder, lane, weight float64, opacity uint32) *builder.PathRef {
	path := ab.Path(cx, cy)
	pointAt := func(i int, side float64) {
		t := float64(i) / segments
		p, a, b := pathAt(t, lane), pathAt(t-.001, lane), pathAt(t+.001, lane)
		dx, dy := b.x-a.x, b.y-a.y
		normal := math.Hypot(dx, dy)
		w := weight * side * math.Pow(math.Max(0, math.Sin(math.Pi*t)), .52)
		path.LineTo(p.x-w*dy/normal, p.y+w*dx/normal)
	}
	for i := 0; i <= segments; i++ {
		pointAt(i, 1)
	}
	for i := segments; i >= 0; i-- {
		pointAt(i, -1)
	}
	color := uint32(0xFFF5E9)
	if lane < -.1 {
		color = 0xFFAA61
	}
	return path.Close().FillGradient(-285, 136, 286, -153,
		builder.GradientStop{Position: 0, Color: opacity<<24 | 0x893EFF},
		builder.GradientStop{Position: .32, Color: opacity<<24 | 0xD647D0},
		builder.GradientStop{Position: .65, Color: opacity<<24 | 0xFF7F4F},
		builder.GradientStop{Position: 1, Color: opacity<<24 | color},
	)
}

func motion(ab *builder.ArtboardBuilder, name string, paths []*builder.PathRef, boost float64) {
	a := ab.Animation(name, builder.WithFPS(60), builder.WithDuration(360), builder.WithLoop(builder.Loop))
	for _, p := range paths {
		a.KeyframeFloat(p, builder.PropOpacity, 0, boost, builder.Hold())
		a.KeyframeFloat(p, builder.PropRotation, 0, -.055, builder.Linear()).
			KeyframeFloat(p, builder.PropRotation, 180, .055, builder.Linear()).
			KeyframeFloat(p, builder.PropRotation, 360, -.055, builder.Linear())
	}
}

func trace(ab *builder.ArtboardBuilder, spark *builder.ShapeRef) {
	a := ab.Animation("Trace", builder.WithFPS(60), builder.WithDuration(360), builder.WithLoop(builder.Loop))
	for i := 0; i <= 60; i++ {
		t := float64(i) / 60
		p := pathAt(t, .19)
		a.KeyframeFloat(spark, builder.PropX, uint64(i*6), cx+p.x, builder.Linear())
		a.KeyframeFloat(spark, builder.PropY, uint64(i*6), cy+p.y, builder.Linear())
	}
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: go run . <output.riv>")
		os.Exit(2)
	}
	file := builder.New()
	ab := file.Artboard("Signal", width, height)
	for i := range 68 {
		x, y := 46+math.Mod(float64(i)*137.14, width-83), 35+math.Mod(float64(i)*97.6, height-68)
		r := 1 + float64(i%4)*.53
		ab.Ellipse(x, y, r, r).Fill(uint32(20+i%7*15)<<24 | 0xDBA5DD)
	}
	aura := ab.Ellipse(cx+96, cy-45, 700, 490)
	aura.FillRadialGradient(0, 0, 330, 0,
		builder.GradientStop{Position: 0, Color: 0x3B602347},
		builder.GradientStop{Position: .52, Color: 0x171E113D},
		builder.GradientStop{Position: 1, Color: 0x001E113D},
	)
	type stroke struct {
		w float64
		a uint32
	}
	var paths []*builder.PathRef
	for _, s := range []stroke{{22, 4}, {11, 10}, {5, 29}, {2.1, 73}, {.79, 248}} {
		for i := range 12 {
			paths = append(paths, band(ab, float64(i)/5.5-1, s.w, s.a))
		}
	}
	spark := ab.Ellipse(cx, cy, 36, 36).FillRadialGradient(0, 0, 18, 0,
		builder.GradientStop{Position: 0, Color: 0xFFFFFFFF},
		builder.GradientStop{Position: .18, Color: 0xDAFFE0BB},
		builder.GradientStop{Position: 1, Color: 0x00FFC0B0},
	)
	motion(ab, "Flow", paths, .62)
	motion(ab, "Pulse", paths, 1)
	trace(ab, spark)
	sm := ab.StateMachine("Signal Logic")
	pulse := sm.NumberInput("Pulse")
	sm.Layer("Traveling light").State("Trace", builder.WithAnimation("Trace"))
	layer := sm.Layer("Light")
	flow := layer.State("Flow", builder.WithAnimation("Flow"))
	hot := layer.State("Pulse", builder.WithAnimation("Pulse"))
	layer.Transition(flow, hot).When(pulse).Equals(1).Duration(250)
	layer.Transition(hot, flow).When(pulse).Equals(0).Duration(500)

	easing(file)
	bytes, err := file.Bytes()
	if err == nil {
		err = os.WriteFile(os.Args[1], bytes, 0644)
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func easing(file *builder.Builder) {
	const w, h = 650, 300
	ab := file.Artboard("Timing", w, h)
	for _, y := range []float64{93, 202} {
		ab.Rectangle(w/2, y, 492, 2).Fill(0xFF65506F)
		for i := range 11 {
			ab.Ellipse(79+float64(i)*49.2, y, 5, 5).Fill(0xFF92749E)
		}
	}
	linear := ab.Ellipse(79, 93, 32, 32).Fill(0xFFFFB38B)
	curve := ab.Ellipse(79, 202, 32, 32).Fill(0xFFC994FF)
	anim := ab.Animation("Linear and Bezier", builder.WithFPS(60), builder.WithDuration(150), builder.WithLoop(builder.PingPong))
	anim.KeyframeFloat(linear, builder.PropX, 0, 79, builder.Linear()).
		KeyframeFloat(linear, builder.PropX, 150, 571, builder.Linear())
	anim.KeyframeFloat(curve, builder.PropX, 0, 79, builder.Cubic(.72, .05, .29, .95)).
		KeyframeFloat(curve, builder.PropX, 150, 571, builder.Linear())
}
