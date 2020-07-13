---
id: intro
title: Authentication and authorization for Graphback
sidebar_label: Authentication
---
 
Graphback integration allows developers to use their own authentication and autorization solution.
Graphback will work with any existing Node.js library like Express or Fastify thus any authentication library
that works on top of those framework will be supported. 


For authorization developers can write their own class that extends `GraphbackProxyService` abstraction.
`GraphbackProxyService` allows developers to wrap any other services by giving ability to execute
pre and post crud operation handlers. Pre and post operations can be used to provide autorization rules 
and prevent from unautorized access.

## Out of the box Authorization on top of the Graphback

Graphback recomends using following authorization libraries

- [Passport.js](http://www.passportjs.org/) if you looking for in application authorization and authentication mechanisms.
- [Keycloak](https://www.keycloak.org/) SSO - Standalone SSO server offering integration with various social OAuth logins and federating users.

Graphback provides out of the box support for Keycloak SSO thanks to @graphback/keycloak-authz that utilizes
https://github.com/aerogear/keycloak-connect-graphql library
