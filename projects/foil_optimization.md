---
title: Airfoil Aerodynamic Optimisation
image: images/projects/foil_optimization.png
tags: STAR-CCM+, XFOIL, Python, MATLAB
report: reports/HW2_AERO3.pdf
---

## Overview

This project focused on the aerodynamic shape optimisation of a two-dimensional aerofoil section using a combination of potential-flow panel methods and Reynolds-Averaged Navier–Stokes (RANS) CFD. The objective was to maximise the lift-to-drag ratio at a target cruise condition while respecting geometric constraints on thickness and camber.

## Methodology

- Baseline geometry defined using the NACA 4-digit series; parameterised via Bézier control points for smooth shape deformation.
- **XFOIL** used for rapid low-fidelity evaluation across the design space during the initial sweep.
- High-fidelity RANS simulations performed in **STAR-CCM+** with the SST k–ω turbulence model to validate promising candidates.
- Optimisation loop driven by a gradient-free algorithm (Nelder–Mead simplex) coupled to the XFOIL evaluator in **Python**.

## Key Results

- Achieved a **12 % increase in L/D** relative to the baseline at the design lift coefficient.
- Identified a favourable laminar bucket extending the low-drag region by approximately 2° in angle of attack.
- Pressure coefficient distributions showed good agreement between XFOIL predictions and RANS results in attached-flow conditions.

## Tools

`XFOIL` · `STAR-CCM+` · `Python` · `MATLAB`
