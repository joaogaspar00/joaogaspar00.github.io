---
title: Supersonic Jet Shock Structure Analysis
image: images/projects/jet_shocks.png
tags: OpenFOAM, CFD, Python
report: reports/HW4___Computacional_Fluid_Mechanics.pdf
---

## Overview

Computational study of the shock-cell structure and Mach disk formation in underexpanded supersonic jets exhausting from a convergent nozzle. The work characterised the influence of nozzle pressure ratio (NPR) on shock spacing, screech tone generation, and mixing layer development.

## Methodology

- Axisymmetric RANS and unsteady RANS (URANS) simulations performed in **OpenFOAM** using the `rhoPimpleFoam` solver.
- Pressure-based shock capturing with the Kurganov–Tadmor scheme; SST k–ω turbulence model.
- Schlieren-like visualisations generated from density gradient magnitude to replicate experimental flow imagery.
- Shock spacing compared against the empirical Prandtl–Pack formula for validation.

## Key Results

- Shock-cell spacing predictions within **4 %** of Prandtl–Pack estimates across NPR = 2.0–4.0.
- Mach disk formation correctly predicted above NPR ≈ 3.8.
- URANS simulations captured the screech feedback loop and associated pressure fluctuations at the nozzle lip.

## Tools

`OpenFOAM` · `Python` · `MATLAB`
