// Build the original Field Studies artboards and their Rive state machines.
package main

import (
	_ "embed"
	"fmt"
	"math"
	"os"

	"github.com/redriot-io/rive-go/rive/builder"
)

//go:embed fonts/SpaceGrotesk.ttf
var grotesk []byte

//go:embed fonts/IBMPlexMono-Regular.ttf
var mono []byte

const (
	ink   = 0xFF111311
	paper = 0xFFF1F0E8
	muted = 0xFFABAEA3
	line  = 0xFF343831
)

type study struct {
	name, legend string
	accent       uint32
}

var studies = []study{
	{"Orbit", "ROTATION  /  TOROIDAL FIELD", 0xFFE0F94D},
	{"Wave", "INTERFERENCE  /  WAVE FIELD", 0xFFFF8E73},
	{"Mesh", "DEFORMATION  /  CONTOUR FIELD", 0xFF8BE8F2},
}

type frame struct{ x, y, w, h float64 }

type scene struct {
	board         *builder.ArtboardBuilder
	sans, mono    *builder.FontRef
	visible       [3][]builder.AnimTarget
	paths         [3][]*builder.PathRef
	buttons       [3]*builder.ShapeRef
	buttonLabels  [3]*builder.TextRef
	buttonNumbers [3]*builder.TextRef
}

func rect(board *builder.ArtboardBuilder, x, y, w, h float64, color uint32) *builder.ShapeRef {
	return board.Rectangle(x+w/2, y+h/2, w, h).Fill(color)
}

func (s *scene) text(content string, x, y, size float64, color uint32, technical bool, weight float64) *builder.TextRef {
	target := s.board.Text(content).Position(x, y)
	font := s.sans
	if technical {
		font = s.mono
	}
	paint := target.Style(font, size).Fill(color)
	if weight != 0 {
		paint.FontVariation("wght", weight)
	}
	return target.Run(content, paint)
}

func (s *scene) rule(x1, y1, x2, y2 float64, color uint32) {
	s.board.Path(0, 0).LineTo(x1, y1).LineTo(x2, y2).Stroke(1, color)
}

func (s *scene) chrome(w, h float64, mobile bool) frame {
	gutter := 64.0
	if mobile {
		gutter = 24
	}
	rect(s.board, 0, 0, w, h, ink)
	s.board.Ellipse(gutter+10, 46, 17, 17).Stroke(1.35, paper)
	s.board.Ellipse(gutter+10, 46, 8, 17).Stroke(1.1, paper)
	s.rule(gutter+1, 46, gutter+19, 46, paper)
	s.text("FIELD STUDIES", gutter+31, 34, 19, paper, false, 650)
	s.text("MOTION LAB", w-gutter-100, 41, 12, muted, true, 0)
	s.rule(gutter, 77, w-gutter, 77, line)

	if mobile {
		s.text("INTERACTIVE MOTION STUDIES", 24, 103, 10.5, studies[0].accent, true, 0)
		s.text("FIELD", 20, 124, 76, paper, false, 700)
		s.text("STUDIES", 20, 192, 76, paper, false, 700)
		s.text("Three fields, three ways to move.", 24, 283, 16, muted, false, 0)
		s.addButtons(24, 324, w-48, 54, true)
		s.rule(24, 810, w-24, 810, line)
		s.text("FIELD STUDIES", 24, 827, 11, paper, true, 0)
		s.text("SELECT A STUDY ABOVE", 238, 827, 10, muted, true, 0)
		return frame{24, 396, w - 48, 389}
	}

	s.text("INTERACTIVE MOTION STUDIES", 64, 200, 14, studies[0].accent, true, 0)
	s.text("FIELD", 55, 231, 134, paper, false, 700)
	s.text("STUDIES", 55, 344, 134, paper, false, 700)
	s.text("Three fields, three ways to move.", 64, 522, 25, paper, false, 0)
	s.text("Select a study to explore its motion.", 64, 560, 17, muted, false, 0)
	s.addButtons(64, 619, 504, 62, false)
	s.rule(64, h-62, w-64, h-62, line)
	s.text("FIELD STUDIES", 64, h-45, 12, paper, true, 0)
	s.text("PRESS 1–3 TO SWITCH", w-220, h-45, 12, muted, true, 0)
	return frame{636, 124, w - 700, h - 231}
}

func (s *scene) addButtons(x, y, w, h float64, mobile bool) {
	gap := 8.0
	bw := (w - 2*gap) / 3
	for i, mode := range studies {
		left := x + float64(i)*(bw+gap)
		s.buttons[i] = rect(s.board, left, y, bw, h, 0xFF1C201C).
			CornerRadius(7).Name(mode.name + " control")
		s.buttonNumbers[i] = s.text(fmt.Sprintf("%02d", i+1), left+12, y+9, 10, muted, true, 0)
		size := 19.0
		if mobile {
			size = 17
		}
		s.buttonLabels[i] = s.text(mode.name, left+12, y+24, size, paper, false, 650)
	}
}

func (s *scene) drawPanel(f frame, mobile bool) {
	bg := rect(s.board, f.x, f.y, f.w, f.h, 0xFF1A1E19)
	bg.CornerRadius(9).Stroke(1, line)
	for x := f.x + 19; x < f.x+f.w-8; x += 27 {
		for y := f.y + 73; y < f.y+f.h-51; y += 27 {
			s.board.Ellipse(x, y, 2, 2).Fill(0xFF374137)
		}
	}
	s.rule(f.x+19, f.y+54, f.x+f.w-19, f.y+54, line)
	s.rule(f.x+19, f.y+f.h-48, f.x+f.w-19, f.y+f.h-48, line)
	cx, cy := f.x+f.w/2, f.y+f.h*.508
	scale := math.Min(f.w/480, f.h/500)
	s.rule(cx-9, cy, cx+9, cy, 0xFF5B6356)
	s.rule(cx, cy-9, cx, cy+9, 0xFF5B6356)
	for i, mode := range studies {
		headline := s.text(fmt.Sprintf("STUDY / %02d", i+1), f.x+19, f.y+18, 13, mode.accent, true, 0)
		s.visible[i] = append(s.visible[i], headline)
		label := s.text(mode.legend, f.x+19, f.y+f.h-33, 11, mode.accent, true, 0)
		s.visible[i] = append(s.visible[i], label)
		s.drawField(i, mode.accent, cx, cy, scale)
	}
	mark := "FIELD / 01–03"
	font := 11.0
	if mobile {
		mark = "01–03"
		font = 9
	}
	s.text(mark, f.x+f.w-108, f.y+20, font, muted, true, 0)
}

func (s *scene) drawField(mode int, color uint32, cx, cy, scale float64) {
	series := [...]int{35, 39, 32}
	for row := range series[mode] {
		q := float64(row) / float64(series[mode]-1)
		path := s.board.Path(cx, cy).Name(fmt.Sprintf("%s line %02d", studies[mode].name, row+1))
		for p := 0; p <= 100; p++ {
			t := float64(p) / 100
			x, y := fieldPoint(mode, t, q)
			path.LineTo(x*scale, y*scale)
		}
		alpha := uint32(104 + 138*math.Abs(math.Cos(q*math.Pi)))
		path.Stroke(math.Max(.9, 1.55*scale), color&0xFFFFFF|alpha<<24)
		if mode == 0 {
			path.Close()
		}
		if mode != 0 {
			path.Opacity(0)
		}
		s.visible[mode] = append(s.visible[mode], path)
		s.paths[mode] = append(s.paths[mode], path)
	}
}

func fieldPoint(mode int, t, q float64) (float64, float64) {
	switch mode {
	case 0:
		u, v := 2*math.Pi*t, 2*math.Pi*q
		radius := 147 + 54*math.Cos(v)
		x, y, z := radius*math.Cos(u), radius*math.Sin(u), 54*math.Sin(v)
		viewY, viewZ := .57*y-.82*z, .82*y+.57*z
		p := 490 / (490 + viewZ)
		return p * (.95*x + .31*viewY), p * (-.31*x + .95*viewY)
	case 1:
		x, z := (t-.5)*408, (q-.5)*330
		y := 61*math.Sin(x*.030+z*.024) + 24*math.Cos(z*.044-x*.011)
		p := 590 / (590 + z*.55)
		return p * (.84*x + .32*z), p * (.62*z + .85*y)
	default:
		u := 2 * math.Pi * t
		r := 36 + 145*q + (11+20*q)*math.Cos(5*u+q*math.Pi) + 13*math.Sin(2*u)
		return r*math.Cos(u) + 25*math.Sin(q*math.Pi), .81*r*math.Sin(u) + 29*math.Sin(2*u+q*2)
	}
}

func (s *scene) attachStateMachine() {
	controller := s.board.StateMachine("Field Selector")
	selection := controller.NumberInput("Study")
	layer := controller.Layer("Studies")
	states := make([]*builder.StateRef, len(studies))

	for i, mode := range studies {
		anim := s.board.Animation(mode.name, builder.WithFPS(60), builder.WithDuration(480), builder.WithLoop(builder.Loop))
		for j := range studies {
			on := i == j
			opacity := 0.0
			button, text, number := uint32(0xFF1C201C), uint32(paper), uint32(muted)
			if on {
				opacity = 1
				button, text, number = mode.accent, ink, 0xFF313817
			}
			for _, target := range s.visible[j] {
				anim.KeyframeFloat(target, builder.PropOpacity, 0, opacity, builder.Hold())
			}
			anim.KeyframeColor(s.buttons[j], builder.PropColorValue, 0, button, builder.Hold())
			anim.KeyframeColor(s.buttonLabels[j], builder.PropColorValue, 0, text, builder.Hold())
			anim.KeyframeColor(s.buttonNumbers[j], builder.PropColorValue, 0, number, builder.Hold())
		}
		for idx, path := range s.paths[i] {
			bias := float64(idx%5) * .006
			anim.KeyframeFloat(path, builder.PropRotation, 0, 0, builder.Linear()).
				KeyframeFloat(path, builder.PropRotation, 120, .085+bias, builder.Linear()).
				KeyframeFloat(path, builder.PropRotation, 360, -.085-bias, builder.Linear()).
				KeyframeFloat(path, builder.PropRotation, 480, 0, builder.Linear())
		}
		states[i] = layer.State(mode.name, builder.WithAnimation(mode.name))
		// The Rive runtime wire enum reserves 5 for events and uses 6 for clicks.
		const click = builder.ListenerType(6)
		controller.Listener(s.buttons[i], click).SetNumber(selection, float64(i))
	}
	for i, from := range states {
		for j, to := range states {
			if i != j {
				layer.Transition(from, to).When(selection).Equals(float64(j)).Duration(380)
			}
		}
	}
}

func addBoard(file *builder.Builder, name string, width, height float64, mobile bool) {
	board := file.Artboard(name, width, height)
	s := scene{board: board, sans: board.EmbedFont("Space Grotesk", grotesk), mono: board.EmbedFont("IBM Plex Mono", mono)}
	panel := s.chrome(width, height, mobile)
	s.drawPanel(panel, mobile)
	s.attachStateMachine()
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: go run . <output.riv>")
		os.Exit(2)
	}
	file := builder.New()
	addBoard(file, "Desktop", 1440, 900, false)
	addBoard(file, "Mobile", 430, 856, true)
	data, err := file.Bytes()
	if err == nil {
		err = os.WriteFile(os.Args[1], data, 0644)
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Printf("Wrote %s (%d bytes)\n", os.Args[1], len(data))
}
