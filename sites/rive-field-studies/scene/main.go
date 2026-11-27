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
	ink   = 0xFF080A13
	paper = 0xFFF7F7FF
	muted = 0xFF9B9FB8
	line  = 0xFF252940
)

type study struct {
	name, legend string
	accent       uint32
	colors       [3]uint32
}

var studies = []study{
	{"Orbit", "LOOPS OF LIGHT", 0xFFBFA5FF, [3]uint32{0xFF4878FF, 0xFF9C67FF, 0xFFFF61C4}},
	{"Wave", "AURORA RIBBONS", 0xFFA2F4F0, [3]uint32{0xFF2568FF, 0xFF54DBC6, 0xFFBDFFAD}},
	{"Mesh", "RADIANT PETALS", 0xFFFFAACD, [3]uint32{0xFF855EFF, 0xFFFF508E, 0xFFFFAD72}},
}

type frame struct{ x, y, w, h float64 }

type scene struct {
	board                   *builder.ArtboardBuilder
	sans, mono              *builder.FontRef
	visible                 [3][]builder.AnimTarget
	paths                   [3][]*builder.PathRef
	buttons                 [3]*builder.ShapeRef
	buttonLabels            [3]*builder.TextRef
	buttonNumbers           [3]*builder.TextRef
	downloadButtons         [2]*builder.ShapeRef
	sparks                  [3][]*builder.ShapeRef
	centerX, centerY, scale float64
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
	s.text("AFTERGLOW", gutter+31, 34, 19, paper, false, 650)
	s.text("WALLPAPERS", w-gutter-100, 41, 12, muted, true, 0)
	s.rule(gutter, 77, w-gutter, 77, line)

	if mobile {
		s.text("LIGHT WALLPAPERS", 24, 103, 10.5, studies[0].accent, true, 0)
		s.text("AFTER", 20, 124, 76, paper, false, 700)
		s.text("GLOW", 20, 192, 76, paper, false, 700)
		s.text("Light wallpapers for any screen.", 24, 283, 16, muted, false, 0)
		s.addButtons(24, 324, w-48, 54, true)
		s.addDownloads(24, 806, w-48)
		return frame{24, 396, w - 48, 386}
	}

	s.text("LIGHT WALLPAPERS", 64, 200, 14, studies[0].accent, true, 0)
	s.text("AFTER", 55, 231, 134, paper, false, 700)
	s.text("GLOW", 55, 344, 134, paper, false, 700)
	s.text("Light wallpapers for any screen.", 64, 522, 25, paper, false, 0)
	s.text("Choose a pattern, then save it as a PNG.", 64, 560, 17, muted, false, 0)
	s.addButtons(64, 619, 504, 62, false)
	s.addDownloads(64, 716, 504)
	s.rule(64, h-62, w-64, h-62, line)
	s.text("AFTERGLOW", 64, h-45, 12, paper, true, 0)
	s.text("1–3: PATTERN", w-220, h-45, 12, muted, true, 0)
	return frame{636, 124, w - 700, h - 231}
}

func (s *scene) addButtons(x, y, w, h float64, mobile bool) {
	gap := 8.0
	bw := (w - 2*gap) / 3
	for i, mode := range studies {
		left := x + float64(i)*(bw+gap)
		s.buttons[i] = rect(s.board, left, y, bw, h, 0xFF171B2D).
			CornerRadius(7).Name(mode.name + " control")
		s.buttonNumbers[i] = s.text(fmt.Sprintf("%02d", i+1), left+12, y+9, 10, muted, true, 0)
		size := 19.0
		if mobile {
			size = 17
		}
		s.buttonLabels[i] = s.text(mode.name, left+12, y+24, size, paper, false, 650)
	}
}

func (s *scene) addDownloads(x, y, width float64) {
	const gap = 8.
	buttonWidth := (width - gap) / 2
	titles := []string{"Save desktop", "Save phone"}
	dimensions := []string{"1920 × 1080 · PNG", "1080 × 1920 · PNG"}
	for i, title := range titles {
		left := x + float64(i)*(buttonWidth+gap)
		s.downloadButtons[i] = rect(s.board, left, y, buttonWidth, 63, 0xFF1D1933).
			CornerRadius(8).Stroke(1, 0xFF51446B).Name(title)
		s.text(title, left+13, y+8, 17, paper, false, 650)
		s.text(dimensions[i], left+13, y+36, 10, muted, true, 0)
		arrowX, arrowY := left+buttonWidth-23, y+24
		s.rule(arrowX, arrowY-6, arrowX, arrowY+6, 0xFFD6C6FF)
		s.board.Path(0, 0).LineTo(arrowX-4, arrowY+2).
			LineTo(arrowX, arrowY+6).LineTo(arrowX+4, arrowY+2).Stroke(1, 0xFFD6C6FF)
	}
}

func alpha(color uint32, opacity uint32) uint32 {
	return color&0xFFFFFF | opacity<<24
}

func (s *scene) track(mode int, item builder.AnimTarget) {
	s.visible[mode] = append(s.visible[mode], item)
}

func (s *scene) drawPanel(f frame, mobile bool) {
	rect(s.board, f.x, f.y, f.w, f.h, 0xFF0B0E1C).CornerRadius(10).Stroke(1, line)
	s.drawArt(f)
	for i, mode := range studies {
		s.track(i, s.text(mode.legend, f.x+21, f.y+f.h-37, 11, mode.accent, true, 0))
	}
	s.text("PREVIEW", f.x+21, f.y+20, 12, muted, true, 0)
	if !mobile {
		s.rule(f.x+21, f.y+49, f.x+f.w-21, f.y+49, line)
		s.rule(f.x+21, f.y+f.h-49, f.x+f.w-21, f.y+f.h-49, line)
	}
}

func (s *scene) drawArt(f frame) {
	s.centerX, s.centerY = f.x+f.w/2, f.y+f.h*.52
	s.scale = .94 * math.Min(f.w/546, f.h/465)
	cx, cy, scale := s.centerX, s.centerY, s.scale

	for i, mode := range studies {
		for j, color := range mode.colors {
			x := cx + float64(j-1)*101*scale
			y := cy - float64(j%2)*61*scale
			r := 166 * scale
			haze := s.board.Ellipse(x, y, 2*r, 2*r).FillRadialGradient(0, 0, r, 0,
				builder.GradientStop{Position: 0, Color: alpha(color, 38)},
				builder.GradientStop{Position: .50, Color: alpha(color, 14)},
				builder.GradientStop{Position: 1, Color: alpha(color, 0)},
			)
			haze.Opacity(0)
			s.track(i, haze)
		}
		s.drawField(i)
	}
	for i := range 36 {
		x := f.x + 23 + math.Mod(float64(i)*97.13, f.w-46)
		y := f.y + 64 + math.Mod(float64(i)*59.41, f.h-126)
		d := 1.25 + .72*float64(i%4)
		s.board.Ellipse(x, y, d, d).Fill(alpha(0xFFB2C3FF, uint32(40+i%5*17)))
	}
}

type point struct{ x, y float64 }

func fieldPoint(mode int, t, q float64) point {
	u := 2 * math.Pi * t
	d := q - .5
	switch mode {
	case 0:
		x := 226*math.Sin(u-.94) + 21*math.Sin(2*u)
		y := 106*math.Sin(2*u-1.56) + 37*math.Cos(u-.48)
		y += 94*d*math.Sin(u-.73) + 32*d
		x += d * (56*math.Cos(u+1.3) + 25)
		return point{.96*x + .28*y, -.28*x + .96*y}
	case 1:
		x := (t - .5) * 520
		y := (87+68*q)*math.Sin(u*1.11+1.12+2*d) + 44*math.Sin(2*u-.6) + 99*d - .24*x
		return point{x, y * .86}
	default:
		a := u*1.54 - 1.43
		r := 139 + 46*math.Cos(3.1*a-1.53) + 47*d + 18*math.Sin(2.4*a+q)
		return point{1.28 * r * math.Cos(a), .84*r*math.Sin(a) - 28*math.Cos(1.52*a)}
	}
}

func (s *scene) ribbon(mode int, row int, q, width float64, luminosity uint32, title string) {
	const steps = 96
	factor := s.scale
	path := s.board.Path(s.centerX, s.centerY).Name(fmt.Sprintf("%s %s %02d", studies[mode].name, title, row))
	side := func(sample int, sign float64) {
		t := float64(sample) / steps
		p := fieldPoint(mode, t, q)
		a := fieldPoint(mode, t-.001, q)
		b := fieldPoint(mode, t+.001, q)
		dx, dy := b.x-a.x, b.y-a.y
		length := math.Max(.001, math.Hypot(dx, dy))
		taper := math.Pow(math.Max(0, math.Sin(math.Pi*t)), .53)
		thickness := sign * width * taper * (0.74 + .26*math.Sin(2.4*math.Pi*t+.3+q))
		path.LineTo((p.x-dy/length*thickness)*factor, (p.y+dx/length*thickness)*factor)
	}
	for k := range steps + 1 {
		side(k, 1)
	}
	for k := steps; k >= 0; k-- {
		side(k, -1)
	}
	c := studies[mode].colors
	if title == "core" && row%3 != 0 {
		c[1] = 0xFFF8F3FF
	}
	path.Close().FillGradient(-235*factor, 55*factor, 235*factor, -55*factor,
		builder.GradientStop{Position: 0, Color: alpha(c[0], luminosity)},
		builder.GradientStop{Position: .52, Color: alpha(c[1], luminosity)},
		builder.GradientStop{Position: 1, Color: alpha(c[2], luminosity)},
	)
	path.Opacity(0)
	s.track(mode, path)
	s.paths[mode] = append(s.paths[mode], path)
}

func (s *scene) drawField(mode int) {
	const strands = 10
	layers := []struct {
		name    string
		width   float64
		opacity uint32
	}{
		{"aura", 16, 5}, {"halo", 8, 16}, {"glow", 3.3, 52}, {"core", .93, 232},
	}
	for _, layer := range layers {
		for row := range strands {
			s.ribbon(mode, row, float64(row)/float64(strands-1), layer.width, layer.opacity, layer.name)
		}
	}

	for _, size := range []float64{19, 4.9, 2.55} {
		r := size * s.scale
		dot := s.board.Ellipse(s.centerX, s.centerY, r*2, r*2).Name("Traveling light")
		dot.FillRadialGradient(0, 0, r, 0,
			builder.GradientStop{Position: 0, Color: alpha(0xFFFFFFFF, 247)},
			builder.GradientStop{Position: .28, Color: alpha(studies[mode].accent, 150)},
			builder.GradientStop{Position: 1, Color: alpha(studies[mode].accent, 0)},
		)
		dot.Opacity(0)
		s.track(mode, dot)
		s.sparks[mode] = append(s.sparks[mode], dot)
	}
}

func (s *scene) animateField(anim *builder.AnimationBuilder, mode int) {
	for _, path := range s.paths[mode] {
		anim.KeyframeFloat(path, builder.PropRotation, 0, 0, builder.Linear()).
			KeyframeFloat(path, builder.PropRotation, 120, .092, builder.Linear()).
			KeyframeFloat(path, builder.PropRotation, 360, -.092, builder.Linear()).
			KeyframeFloat(path, builder.PropRotation, 480, 0, builder.Linear())
	}
	const sweep = 48
	for _, dot := range s.sparks[mode] {
		for _, property := range []uint32{builder.PropScaleX, builder.PropScaleY} {
			anim.KeyframeFloat(dot, property, 0, .01, builder.Linear()).
				KeyframeFloat(dot, property, 32, 1, builder.Linear()).
				KeyframeFloat(dot, property, 448, 1, builder.Linear()).
				KeyframeFloat(dot, property, 480, .01, builder.Linear())
		}
		for step := range sweep + 1 {
			t := float64(step) / sweep
			p := fieldPoint(mode, t, .55)
			angle := .092 * (1 - 4*math.Abs(t-.25))
			if t > .75 {
				angle = -.368 * (1 - t)
			}
			x := p.x*math.Cos(angle) - p.y*math.Sin(angle)
			y := p.x*math.Sin(angle) + p.y*math.Cos(angle)
			anim.KeyframeFloat(dot, builder.PropX, uint64(step*10), s.centerX+x*s.scale, builder.Linear())
			anim.KeyframeFloat(dot, builder.PropY, uint64(step*10), s.centerY+y*s.scale, builder.Linear())
		}
	}
}

func (s *scene) attachStateMachine(interactive bool) {
	controller := s.board.StateMachine("Field Selector")
	selection := controller.NumberInput("Study")
	// The runtime wire format uses 6 for the click listener.
	const click = builder.ListenerType(6)
	if interactive {
		download := controller.NumberInput("Download")
		for i, button := range s.downloadButtons {
			controller.Listener(button, click).SetNumber(download, float64(i+1))
		}
	}
	layer := controller.Layer("Studies")
	states := make([]*builder.StateRef, len(studies))

	for i, mode := range studies {
		anim := s.board.Animation(mode.name, builder.WithFPS(60), builder.WithDuration(480), builder.WithLoop(builder.Loop))
		for j := range studies {
			on := i == j
			opacity := 0.0
			button, text, number := uint32(0xFF171B2D), uint32(paper), uint32(muted)
			if on {
				opacity = 1
				button, text, number = mode.accent, ink, 0xFF282033
			}
			for _, target := range s.visible[j] {
				anim.KeyframeFloat(target, builder.PropOpacity, 0, opacity, builder.Hold())
			}
			if interactive {
				anim.KeyframeColor(s.buttons[j], builder.PropColorValue, 0, button, builder.Hold())
				anim.KeyframeColor(s.buttonLabels[j], builder.PropColorValue, 0, text, builder.Hold())
				anim.KeyframeColor(s.buttonNumbers[j], builder.PropColorValue, 0, number, builder.Hold())
			}
		}
		s.animateField(anim, i)
		states[i] = layer.State(mode.name, builder.WithAnimation(mode.name))
		if interactive {
			controller.Listener(s.buttons[i], click).SetNumber(selection, float64(i))
		}
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
	s.attachStateMachine(true)
}

func addWallpaper(file *builder.Builder, name string, width, height float64) {
	board := file.Artboard(name, width, height)
	rect(board, 0, 0, width, height, 0xFF080A17)
	s := scene{board: board}
	s.drawArt(frame{0, 0, width, height})
	s.attachStateMachine(false)
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: go run . <output.riv>")
		os.Exit(2)
	}
	file := builder.New()
	addBoard(file, "Desktop", 1440, 900, false)
	addBoard(file, "Mobile", 430, 894, true)
	addWallpaper(file, "Desktop Wallpaper", 1920, 1080)
	addWallpaper(file, "Phone Wallpaper", 1080, 1920)
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
