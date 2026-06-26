---
title: Bombardier Aircraft Aerodynamic Dimensional Study
image: images/projects/dim_bombardier.jpeg
tags: STAR-CCM+, SolidWorks, MATLAB, Python
report: reports/Aircraft_Optmization.pdf
---

## Overview

Dimensional analysis and scaling study of the Bombardier CRJ regional jet configuration. The project derived the governing non-dimensional parameters controlling aerodynamic performance and used similarity theory to relate wind-tunnel model results to full-scale flight conditions.

## Methodology

- Buckingham π theorem applied to identify the relevant non-dimensional groups: Reynolds number, Mach number, lift coefficient, drag coefficient, and pitching moment coefficient.
- CFD model of the CRJ geometry constructed in **SolidWorks** and meshed for RANS simulation in **STAR-CCM+**.
- Polar sweeps performed at wind-tunnel and flight Reynolds numbers to quantify Re-scaling corrections.
- Comparison of aerodynamic coefficients against publicly available flight-test data.

## Key Results

- Lift curve slope agreed with thin-aerofoil theory within 3 % at low angles of attack.
- Reynolds number effects on maximum lift coefficient quantified; corrections of up to 8 % identified when scaling from tunnel to flight conditions.
- Drag breakdown (induced, viscous, wave) completed using far-field integration in **STAR-CCM+**.

## Tools

`STAR-CCM+` · `SolidWorks` · `MATLAB` · `Python`
