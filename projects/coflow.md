---
title: Co-flow Jet Aerodynamic Analysis
image: images/projects/coflow.jpg
tags: STAR-CCM+, CFD, Python
report: reports/HW3___Computacional_Fluid_Mechanics.pdf
---

## Overview

Investigation of a co-flow jet (CFJ) aerofoil configuration as an active flow-control strategy for high-lift augmentation. The CFJ concept injects a small, energised jet tangentially at the leading edge and withdraws flow at the trailing edge, effectively delaying separation and increasing the maximum lift coefficient without moving surfaces.

## Methodology

- Two-dimensional RANS simulations performed in **STAR-CCM+**; SST k–ω turbulence model selected for its accuracy in adverse pressure gradient regions.
- Parametric sweep over jet momentum coefficient (C_μ = 0.02–0.12) and injection slot height at angles of attack from 0° to 24°.
- Pump power consumption estimated from total-pressure losses to evaluate net aerodynamic efficiency.

## Key Results

- Maximum C_L increased by up to **48 %** compared to the clean baseline at C_μ = 0.08.
- Stall angle delayed from 16° to approximately 22°.
- Net power-corrected L/D improvement of 18 % at moderate C_μ values, demonstrating the practical benefit of the configuration.

## Tools

`STAR-CCM+` · `MATLAB` · `Python`
