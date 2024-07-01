---
title: So the swagger
subtitle: Implementing Swagger in one of my Express-based apps.
date: 2024-07-01
language: English
tags:
  - express
---

Swagger allows the description of APIs so they are easily readable by machines. I am investigating whether it is easy to use in my apps that will be hosted on my home lab machine. For this purpose, I decided to use the package  [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

Usage is quite simple
```js
import fse from 'fs-extra';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

const handleSwagger = (req, res, next) => {
  const yaml = fse.readFileSync('./swagger.yaml', 'utf8');
  const parsed = YAML.parse(yaml);

  swaggerUi.setup(parsed)(req, res, next);

};

router.use('/api-docs', swaggerUi.serve, handleSwagger);

```

And then here is `swagger.yaml` file example: 
```yaml
openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
```

Now, I also need a way to display an image, and to do so, I found that it needs to be done this way:
```yaml
description: |-
	![some title](/image.png)

```

Here, I had to remember that this image needs to be served statically in order to be displayed properly. I checked where I can display the image, and in the two places I have tested so far, one is in the info section and the second is in a specific path description.

In my opinion, it is pretty easy to use Swagger, and it displays documentation in a nice way. Also, using a YAML file for writing documentation is convenient. I started using YAML not long ago when learning Kubernetes, so this could be a nice continuation.
# Links
https://swagger.io/docs/


