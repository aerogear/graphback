---
id: authinto
title: Authentication and autorization for Graphback
sidebar_label: Introduction
---

Graphback abstracts from the authentication mechanism.
By default Graphback templates come without authentication, but it is easy to retrofit any existing authentication mechanism 
on top of Graphback.

Thanks to utilizng `GraphbackCRUDService` abstractions developers can add any rules and implement various different authorization policies.
Graphback developers recomend following libraries:

- Passport.js if you looking for in application authorization and authentication mechanisms.
- Keycloak SSO - Standalone SSO server offering integration with various social oauth logins and federating users.

Graphback provides out of the box support for Keycloak SSO thanks to @graphback/keycloak-authz that utilizes
https://github.com/aerogear/keycloak-connect-graphql library