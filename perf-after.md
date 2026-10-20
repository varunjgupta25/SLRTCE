# Performance Optimized (perf-after.md)

Measured on branch `phase-3` after optimizations.
Dev tools: Playwright Chromium & Google Lighthouse.

## 1. Summary Metrics

| Metric | 375px Mobile | 1280px Desktop |
|---|---|---|
| **Total Image Bytes** | 466.61 KB (477806 B) | 753.56 KB (771650 B) |
| **Image Requests** | 11 | 15 |
| **LCP (Browser Measured)** | 7188 ms | 5436 ms |
| **CLS (Browser Measured)** | 0.0073 | 0.0018 |

## 2. Lighthouse Mobile Audit

- **Performance Score:** 100 / 100
- **Accessibility Score:** 94 / 100
- **Largest Contentful Paint (LCP):** 1.2 s
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
- `after-375.png` (375px viewport)
- `after-768.png` (768px viewport)
- `after-1280.png` (1280px viewport)

## 5. Top 10 Loaded Images (375px)
| URL | Size (KB) |
|---|---|
| `campus_event-640.webp` | 81.37 KB |
| `slide_carpe_diem_2025.webp` | 79.59 KB |
| `slide_dlle_voter_session-640.webp` | 51.02 KB |
| `slide_classroom.webp` | 44.77 KB |
| `slide_campus_lawn-640.webp` | 43.1 KB |
| `slide_alumni_meet-640.webp` | 40.49 KB |
| `slide_college_entrance-640.webp` | 37.62 KB |
| `library-640.webp` | 31.72 KB |
| `campus_building.webp` | 21.6 KB |
| `campus_street.webp` | 20.51 KB |
