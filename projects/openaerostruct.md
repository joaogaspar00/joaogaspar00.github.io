---
title: Aircraft Aerostructural Optimisation with OpenAeroStruct
image: images/projects/openaerostruct.png
tags: Python, OpenAeroStruct, OpenMDAO
report: reports/OpenAeroStruct.pdf
---

## Overview

Multi-disciplinary design optimisation (MDO) of a transport aircraft wing using the open-source **OpenAeroStruct** framework, which couples a vortex-lattice aerodynamic model with a 6-DOF finite-element structural model. The objective was to minimise structural weight while satisfying aerodynamic performance and stress constraints.

## Methodology

- Wing planform (sweep, taper, span) and structural sizing (skin thickness, spar cap area) treated as design variables.
- Gradient-based optimisation using the SLSQP algorithm; analytic derivatives propagated through the coupled aero-structural system via the OpenMDAO framework.
- Cruise and 2.5-g pull-up manoeuvre load cases considered simultaneously.
- Pareto front generated for the weight–drag trade-off to inform conceptual design decisions.

## Key Results

- Structural weight reduced by **22 %** relative to a reference uniform-thickness design, for equivalent aerodynamic performance.
- Optimised wing showed increased sweep and a tapered planform consistent with analytical beam-bending theory.
- Constraint on von Mises stress was active at the wing root under the manoeuvre case, confirming the solver was exploiting the design space fully.

## Tools

`Python` · `OpenAeroStruct` · `OpenMDAO` · `MATLAB`
