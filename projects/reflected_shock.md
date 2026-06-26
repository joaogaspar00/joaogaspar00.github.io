---
title: Reflected Shock Wave Interaction Study
image: images/projects/reflected_shock.png
tags: OpenFOAM, Python, MATLAB
report: reports/HW1___Computacional_Fluid_Mechanics.pdf
---

## Overview

Analysis of oblique shock reflection patterns in a two-dimensional supersonic duct, with a focus on the transition between regular reflection (RR) and Mach reflection (MR). Understanding this transition is critical for intake design, wind-tunnel nozzle geometry, and internal aerodynamics of supersonic aircraft.

## Methodology

- Steady RANS simulations in **OpenFOAM** (`rhoCentralFoam`) over a range of incident shock angles and inflow Mach numbers (M = 1.5–3.5).
- Comparison with von Neumann and detachment criteria to map the RR–MR transition boundary.
- Pressure and Mach contours post-processed in **ParaView** to extract reflection geometry.

## Key Results

- Transition boundary agreed with theoretical dual-solution domain predictions within the expected numerical error band.
- Regular reflection patterns at low wedge angles transitioned to Mach reflection with a well-resolved triple point as angle increased.
- Wall pressure distributions compared favourably with published benchmark data.

## Tools

`OpenFOAM` · `ParaView` · `Python` · `MATLAB`
