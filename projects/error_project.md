---
title: Experimental Uncertainty & Error Analysis
image: images/projects/error_project.png
tags: OpenFOAM, CFD, Python, MATLAB
report: reports/HW2___Computacional_Fluid_Mechanics.pdf
---

## Overview

Systematic quantification of measurement uncertainty in an aerodynamic force-balance experiment, following the GUM (Guide to the Expression of Uncertainty in Measurement) framework. The project identified the dominant error sources in drag and lift coefficient measurements and propagated them to final result uncertainties.

## Methodology

- Uncertainty budget constructed for each sensor in the measurement chain: load cells, pressure transducers, thermocouple, and velocity Pitot probe.
- Type A uncertainties estimated from repeat-measurement statistics; Type B uncertainties from calibration certificates and resolution limits.
- Combined standard uncertainty propagated analytically using partial derivatives of the coefficient expressions.
- Monte Carlo simulation (10 000 samples) performed in **Python** as an independent check on the analytical propagation.
- Sensitivity indices computed to rank error contributors and guide future instrument upgrades.

## Key Results

- Drag coefficient uncertainty held to **±0.8 counts (ΔC_D = 0.008)** at 95 % confidence — within the programme acceptance criterion.
- Load cell zero-drift identified as the dominant uncertainty contributor (38 % of total variance).
- Monte Carlo and analytical results agreed to within 2 %, validating the linearisation assumptions.

## Tools

`MATLAB` · `Python`
