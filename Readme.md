# NOBBS (NO Bullshit Build System)
*"What are you doing?"*

Time to build a build system that is simple and works.


## Introduction

Every build system today is a complicated mess of integrations. If you want the
bare minimum then you will probably be OK. If you want some special workflow or
integration then you will have to hope that the build system that you are
heavily invested in supports what you want to do. In some cases it is even
difficult to understand what kind of workflow is supported by just reading the
documentation. Then you have to install or sign up to a massive number of
solutions just to see if they meet you requirements list.

The question to ask here is of course: Does is have to be this difficult? To
answer this question it is suitable to brake down the requirements of a build
system.

A build system needs to:
- Have builds triggered
- Build software
- Publish software
- Report success of builds
- Trigger integration

It does not sound like rocket science, because it is not. From this list we can
compile high level components grouping the functionality. By making the
separation of concerns between the components high we can build a loosly coupled
distributed system relying on message passing as means of communication. By
defining a common set of messages it will be easy to build multiple
interchangeable variants of each component. This will enable us to build support
for a wide range of functionality keeping each component dead simple. Any number
of these components could then be deployed to form an installation of the
system.

### Trigger

This part will trigger the build system. This can be done in a number of ways.
A variant of this component could poll a scm, another could expose a web
service that is compatible with a scm system's webhook. The important part is
that the variant produces a trigger message containing all information needed by
the builder component.

### Builder

This part will consume trigger messages. Extracting all information to build the
software. A link to the scm, what branch to build and so on. Then this
information will be used to get the software, run some tool or commands like
make, maven, npm or custom shell script to build and publish the software. Then
the component should produce a result message.

### Result Collector

This part will consume the result message and a act upon the results. Variants
of this component could store the results to be used by a GUI, publish the
results to a slack channel, trigger another build or integration. 
