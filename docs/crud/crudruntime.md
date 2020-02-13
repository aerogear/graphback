---
id: crudruntime
title: CRUD Runtime abstraction
sidebar_label: CRUD Abstraction
---

> NOTE: This document is still in progress


Code generators produce a large amount of the code that needs to be maintained later.
Having generator code diverging from original form will prevent developers to utilize generators at later stage. 
Additionally, writing your custom handlers is hard, as you will always need to start from scratch and benefit from the existing layers that provide support for subscriptions and data access. 
Graphback utilizes runtime layer that provides data access methods with support for extensibility.
