---
title: Shock Tube Numerical Simulation
image: images/projects/shocktube.png
tags: MATLAB, Python
report: reports/HW1_AERO3.pdf
---

## Overview

Implementation and validation of a one-dimensional shock tube solver to study the Riemann problem — the canonical test case for compressible flow codes. The simulation resolved the primary shock wave, contact surface, and rarefaction fan propagating from a diaphragm rupture between two gas regions at different pressures.

## Methodology

- Finite-volume solver written in **Python** using the Godunov upwind scheme with exact Riemann solver.
- Second-order accuracy achieved via MUSCL reconstruction with a van Leer slope limiter.
- Results compared against the exact analytical Sod shock tube solution for density, velocity, and pressure profiles.
- Grid refinement study conducted to confirm convergence rate.

## Key Results

- Contact surface and shock positions matched analytical solution to within **0.5 %** at t = 0.25 ms for a 1000-cell grid.
- Confirmed second-order spatial convergence in smooth regions; first-order at discontinuities as expected.
- Solver extended to explore non-ideal gas effects using a van der Waals equation of state.

## Tools

`Python` · `MATLAB`
