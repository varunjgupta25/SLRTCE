# Performance Baseline (perf-before.md)

Measured on branch `phase-3` before optimizations.
Dev tools: Playwright Chromium & Google Lighthouse.

## 1. Summary Metrics

| Metric | 375px Mobile | 1280px Desktop |
|---|---|---|
| **Total Image Bytes** | 2289.79 KB (2344750 B) | 2473.21 KB (2532565 B) |
| **Image Requests** | 12 | 15 |
| **LCP (Browser Measured)** | 15168 ms | 2332 ms |
| **CLS (Browser Measured)** | 0.0081 | 0.0018 |

## 2. Lighthouse Mobile Audit

- **Performance Score:** 94 / 100
- **Accessibility Score:** 94 / 100
- **Largest Contentful Paint (LCP):** 2.4 s
- **Cumulative Layout Shift (CLS):** 0

## 3. Baseline Component Health Checklist

| Component | 375px Mobile | 768px Tablet | 1280px Desktop | Status |
|---|---|---|---|---|
| News Ticker | OK | OK | OK | PASS |
| Hero Carousel | OK | OK | OK | PASS |
| Mobile Menu Toggle | True | True | N/A (desktop) | PASS |
| Nav Dropdowns (Hover) | N/A (mobile/touch) | N/A (mobile/touch) | OK | PASS |
| Nav Dropdowns (Tap) | OK | OK | N/A | PASS |
| Modals System | OK | OK | OK | PASS |
| Admission Enquiry Form | OK | OK | OK | PASS |
| WhatsApp Floating Button | OK | OK | OK | PASS |
| Console Errors | 0 | 0 | 0 | 0 Errors |

## 4. Full-Page Screenshots
- `before-375.png` (375px viewport)
- `before-768.png` (768px viewport)
- `before-1280.png` (1280px viewport)

## 5. Top 10 Heaviest Loaded Images (375px)
| URL | Size (KB) |
|---|---|
| `slide_dlle_voter_session.jpg` | 355.52 KB |
| `campus_building.png` | 338.59 KB |
| `slide_campus_lawn.jpg` | 333.9 KB |
| `slide_alumni_meet.jpg` | 278.13 KB |
| `library.jpg` | 232.79 KB |
| `campus_street.png` | 211.25 KB |
| `campus_event.jpg` | 188.36 KB |
| `slide_college_entrance.jpg` | 92.8 KB |
| `slide_carpe_diem_2025.jpg` | 90.05 KB |
| `slide_classroom.jpg` | 77.24 KB |
