import React, { useEffect, useRef } from 'react';
import '../../styles/torus.css';

/**
 * The poster's WebGL torus, rendered as characters instead — a z-buffered donut
 * lit by the surface normal, written into a <pre>. No canvas, no WebGL, nothing
 * to download.
 *
 * Rotation is expressed in radians per *second*, not per frame, so it drifts at
 * the same speed on a 120Hz display as on a 60Hz one.
 */

const RAMP = '.,-~:;=!*#$@';

// Deliberately slow: a full turn takes ~40s and ~70s on the two axes, so the
// shape reads as ambient rather than as an animation demanding attention.
const SPEED_A = 0.16;
const SPEED_B = 0.09;

// Start part-way round. At A=0 the torus is edge-on — a flat smear — and at this
// speed it would take ~10s to open up. Landing on an already-good pose matters
// more the slower the rotation is.
const PHASE_A = 1.1;
const PHASE_B = 0.5;

const R1 = 1; // tube radius
const R2 = 2; // ring radius
const K2 = 5; // distance from viewer

interface Props {
    /** Grid width in characters. */
    cols?: number;
    /** Grid height in characters. */
    rows?: number;
    className?: string;
}

const AsciiTorus: React.FC<Props> = ({ cols = 74, rows = 30, className = '' }) => {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const kx = (cols * K2 * 3) / (8 * (R1 + R2));
        const ky = kx * 0.5; // character cells are roughly twice as tall as wide

        const zbuf = new Float32Array(cols * rows);
        const out = new Array<string>(cols * rows);

        const draw = (a: number, b: number) => {
            zbuf.fill(0);
            out.fill(' ');

            const cA = Math.cos(a), sA = Math.sin(a);
            const cB = Math.cos(b), sB = Math.sin(b);

            for (let theta = 0; theta < Math.PI * 2; theta += 0.06) {
                const ct = Math.cos(theta), st = Math.sin(theta);
                for (let phi = 0; phi < Math.PI * 2; phi += 0.018) {
                    const cp = Math.cos(phi), sp = Math.sin(phi);

                    const circleX = R2 + R1 * ct;
                    const circleY = R1 * st;

                    const x = circleX * (cB * cp + sA * sB * sp) - circleY * cA * sB;
                    const y = circleX * (sB * cp - sA * cB * sp) + circleY * cA * cB;
                    const z = K2 + cA * circleX * sp + circleY * sA;
                    const ooz = 1 / z;

                    const xp = Math.trunc(cols / 2 + kx * ooz * x);
                    const yp = Math.trunc(rows / 2 - ky * ooz * y);
                    if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue;

                    const idx = xp + cols * yp;
                    const lum =
                        cp * ct * sB - cA * ct * sp - sA * st +
                        cB * (cA * st - ct * sA * sp);

                    if (lum > 0 && ooz > zbuf[idx]) {
                        zbuf[idx] = ooz;
                        const i = Math.trunc((lum * (RAMP.length - 1)) / Math.SQRT2);
                        out[idx] = RAMP[Math.min(Math.max(i, 0), RAMP.length - 1)];
                    }
                }
            }

            let s = '';
            for (let r = 0; r < rows; r++) s += out.slice(r * cols, r * cols + cols).join('') + '\n';
            el.textContent = s;
        };

        // Always paint one frame, so reduced-motion users still see the shape.
        draw(PHASE_A, PHASE_B);

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduced.matches) return;

        let raf = 0;
        let start = performance.now();
        let elapsed = 0;

        const loop = (now: number) => {
            elapsed = (now - start) / 1000;
            draw(PHASE_A + elapsed * SPEED_A, PHASE_B + elapsed * SPEED_B);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // Don't burn frames on a hidden tab; resume without jumping.
        const onVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(raf);
                raf = 0;
            } else if (!raf) {
                start = performance.now() - elapsed * 1000;
                raf = requestAnimationFrame(loop);
            }
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [cols, rows]);

    return <pre ref={ref} className={`ascii-torus ${className}`} aria-hidden="true" />;
};

export default AsciiTorus;
