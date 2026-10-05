# Motion Kit — Documentation & API Reference

Motion Kit là bộ công cụ animation, smooth scroll và micro-interaction độc lập thương hiệu, được thiết kế cho các website có đòi hỏi cao về trải nghiệm thị giác và độ hoàn thiện (craftsmanship).

---

## 1. Cấu trúc thư mục

```text
src/motion/
  index.ts                      # Export toàn bộ components, hooks, utilities (tree-shakeable)
  motion.css                    # CSS tokens (--mk-*), glassmorphism, keyframes, reduced-motion
  README.md                     # Tài liệu API & hướng dẫn sử dụng
  hooks/
    usePrefersReducedMotion.ts  # Phát hiện cài đặt reduced-motion của người dùng
    useInView.ts                # IntersectionObserver với golden defaults (threshold 0.12)
    useScrollProgress.ts        # Tiến độ cuộn (0 -> 1) với RAF throttle
    useScrollSpy.ts             # Theo dõi section id đang xem (offset +160px)
  providers/
    SmoothScrollProvider.tsx    # Bọc Lenis, đồng bộ GSAP ticker, xuất hook useLenis()
  primitives/
    Reveal.tsx                  # Hiệu ứng vào viewport (4 hướng, 750ms, cubic-bezier(.16,1,.3,1))
    TiltCard.tsx                # Hiệu ứng nghiêng 3D + vệt sáng phản chiếu (glare) theo chuột
    CountUp.tsx                 # Đếm số động (1800ms, ease-out cubic, tabular-nums)
    ProgressRing.tsx            # Vòng tiến độ SVG animate khi vào viewport
    EcgWave.tsx                 # Đồ thị sóng điện tâm đồ / nhịp sống động
    PhoneFrame.tsx              # Khung mockup thiết bị di động
  scenes/
    ScrollVideoReveal.tsx       # Set-piece cố định màn hình (pin) + mở rộng clip-path tròn
    glyph-portal.tsx            # Lõi Aperture Portal nguyên bản (MIT © Christian Katzmann)
    GlyphPortalScene.tsx        # Wrapper phong cách điện ảnh cho GlyphPortal
  feedback/
    celebrate.ts                # Pháo hoa Confetti 2 đợt theo tham số vàng
    sound.ts                    # Âm thanh Web Audio (chime hợp âm 3 nốt & tap cơ học)
  demo/
    MotionKitDemo.tsx           # Trang trình diễn toàn bộ tính năng tại route /motion-kit
```

---

## 2. Bảng tham số vàng (Golden Parameters)

| Thành phần | Thuộc tính | Giá trị tiêu chuẩn |
|:---|:---|:---|
| **Lenis** | Duration / Easing | `1.2s` · `t => Math.min(1, 1.001 - Math.pow(2, -10*t))` |
| **Lenis** | Ticker Sync | Đồng bộ trực tiếp `gsap.ticker.add((t) => lenis.raf(t*1000))` |
| **Reveal** | Duration / Easing | `750ms` · `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Reveal** | Distance / Scale | `28px` · `scale(0.985) -> 1` |
| **TiltCard** | Perspective / Tilt | `perspective(1000px)` · `maxTilt 7°` · `scale 1.015` |
| **TiltCard** | Leave Transition | `450ms cubic-bezier(0.2, 0.8, 0.2, 1)` |
| **ScrollVideoReveal** | Breakpoints Pin | `<640px` (18%, +=700) · `640–1023px` (12%, +=950) · `≥1024px` (8%, +=1200) |
| **CountUp** | Duration / Easing | `1800ms` · `1 - Math.pow(1 - progress, 3)` · `tabular-nums` |
| **Celebrate** | 2 Đợt Confetti | Đợt 1 (45 hạt, spread 60) $\to$ **160ms sau** $\to$ Đợt 2 (25 hạt, spread 90) |
| **Sound** | Chime / Tap | Chime (659.25 / 830.61 / 987.77 Hz lệch 80ms) · Tap (440 $\to$ 220Hz / 40ms) |

---

## 3. Bảng API & Hướng dẫn sử dụng

### 3.1. `SmoothScrollProvider` & `useLenis`
```tsx
import { SmoothScrollProvider, useLenis } from "@/motion";

// Bọc quanh router hoặc layout chính
<SmoothScrollProvider>
  <App />
</SmoothScrollProvider>

// Trong component con:
const { scrollTo } = useLenis();
scrollTo("#target-section", { offset: -80 });
```

### 3.2. `Reveal`
```tsx
import { Reveal } from "@/motion";

<Reveal direction="up" delay={100} distance={28} as="section">
  <h2>Tiêu đề xuất hiện mượt mà</h2>
</Reveal>
```

### 3.3. `TiltCard`
```tsx
import { TiltCard } from "@/motion";

<TiltCard maxTilt={7} glare={true} className="p-6 rounded-2xl bg-zinc-900">
  <h3>Thẻ nghiêng 3D</h3>
</TiltCard>
```

### 3.4. `ScrollVideoReveal`
```tsx
import { ScrollVideoReveal } from "@/motion";

<ScrollVideoReveal
  topText="Case Study"
  headingText="Next-Gen Architecture"
  tags={["React 19", "GSAP", "Three.js"]}
  videoSrc="/video.mp4"
  poster="/poster.jpg"
/>
```

### 3.5. `celebrate` & `sound`
```tsx
import { celebrate, sound } from "@/motion";

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  sound.chime(); // Hợp âm êm dịu
  celebrate({ element: e.currentTarget }); // Bắn pháo hoa từ vị trí bấm
}
```

---

## 4. Trợ năng (Accessibility) & Reduced Motion

Mọi thành phần trong Motion Kit đều tự động lắng nghe media query `(prefers-reduced-motion: reduce)`:
- Lenis tự động tắt, trả về hành vi cuộn gốc của trình duyệt.
- GSAP timeline pin và clip-path tự động hủy, hiển thị nội dung tĩnh đọc được hoàn chỉnh.
- TiltCard bỏ lắng nghe sự kiện chuột trên màn hình cảm ứng và chế độ giảm cử động.
- Confetti và Web Audio tự động vô hiệu hóa.
