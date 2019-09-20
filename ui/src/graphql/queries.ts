// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    createdPlans {
      id
      name
      description
      pdfS3Key
      imageS3Info {
        key
        width
        height
      }
      created
      createdBy {
        id
        username
        createdPlans {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
        favoritedPlans {
          items {
            id
            plan {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            user {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
      }
      favoritedBy {
        items {
          id
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          user {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
      materialsRequired {
        items {
          id
          material {
            id
            name
          }
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
      toolsRequired {
        items {
          id
          tool {
            id
            name
          }
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
    }
    favoritedPlans {
      items {
        id
        plan {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
        user {
          id
          username
          createdPlans {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedPlans {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
}
`;
export const getPlan = `query GetPlan($id: ID!) {
  getPlan(id: $id) {
    id
    name
    description
    pdfS3Key
    imageS3Info {
      key
      width
      height
    }
    created
    createdBy {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        imageS3Info {
          key
          width
          height
        }
        created
        createdBy {
          id
          username
          createdPlans {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedPlans {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
        favoritedBy {
          items {
            id
            plan {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            user {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
        materialsRequired {
          items {
            id
            material {
              id
              name
            }
            plan {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
        toolsRequired {
          items {
            id
            tool {
              id
              name
            }
            plan {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
      }
      favoritedPlans {
        items {
          id
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          user {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
    }
    favoritedBy {
      items {
        id
        plan {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
        user {
          id
          username
          createdPlans {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedPlans {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
    materialsRequired {
      items {
        id
        material {
          id
          name
        }
        plan {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
    toolsRequired {
      items {
        id
        tool {
          id
          name
        }
        plan {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
}
`;
export const listPlans = `query ListPlans(
  $filter: ModelPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      pdfS3Key
      imageS3Info {
        key
        width
        height
      }
      created
      createdBy {
        id
        username
        createdPlans {
          id
          name
          description
          pdfS3Key
          imageS3Info {
            key
            width
            height
          }
          created
          createdBy {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          favoritedBy {
            items {
              id
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              user {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          materialsRequired {
            items {
              id
              material {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
          toolsRequired {
            items {
              id
              tool {
                id
                name
              }
              plan {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
        favoritedPlans {
          items {
            id
            plan {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            user {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
      }
      favoritedBy {
        items {
          id
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
          user {
            id
            username
            createdPlans {
              id
              name
              description
              pdfS3Key
              imageS3Info {
                key
                width
                height
              }
              created
              createdBy {
                id
                username
                createdPlans {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedPlans {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
              }
              favoritedBy {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              materialsRequired {
                items {
                  id
                  material {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
              toolsRequired {
                items {
                  id
                  tool {
                    id
                    name
                  }
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedPlans {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
      materialsRequired {
        items {
          id
          material {
            id
            name
          }
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
      toolsRequired {
        items {
          id
          tool {
            id
            name
          }
          plan {
            id
            name
            description
            pdfS3Key
            imageS3Info {
              key
              width
              height
            }
            created
            createdBy {
              id
              username
              createdPlans {
                id
                name
                description
                pdfS3Key
                imageS3Info {
                  key
                  width
                  height
                }
                created
                createdBy {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                favoritedBy {
                  items {
                    id
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    user {
                      id
                      username
                    }
                  }
                  nextToken
                }
                materialsRequired {
                  items {
                    id
                    material {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
                toolsRequired {
                  items {
                    id
                    tool {
                      id
                      name
                    }
                    plan {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                  }
                  nextToken
                }
              }
              favoritedPlans {
                items {
                  id
                  plan {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  user {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                }
                nextToken
              }
            }
            favoritedBy {
              items {
                id
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
                user {
                  id
                  username
                  createdPlans {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                      key
                      width
                      height
                    }
                    created
                    createdBy {
                      id
                      username
                    }
                    favoritedBy {
                      nextToken
                    }
                    materialsRequired {
                      nextToken
                    }
                    toolsRequired {
                      nextToken
                    }
                  }
                  favoritedPlans {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            materialsRequired {
              items {
                id
                material {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
            toolsRequired {
              items {
                id
                tool {
                  id
                  name
                }
                plan {
                  id
                  name
                  description
                  pdfS3Key
                  imageS3Info {
                    key
                    width
                    height
                  }
                  created
                  createdBy {
                    id
                    username
                    createdPlans {
                      id
                      name
                      description
                      pdfS3Key
                      created
                    }
                    favoritedPlans {
                      nextToken
                    }
                  }
                  favoritedBy {
                    items {
                      id
                    }
                    nextToken
                  }
                  materialsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                  toolsRequired {
                    items {
                      id
                    }
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const listMaterials = `query ListMaterials(
  $filter: ModelMaterialFilterInput
  $limit: Int
  $nextToken: String
) {
  listMaterials(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
export const listTools = `query ListTools(
  $filter: ModelToolFilterInput
  $limit: Int
  $nextToken: String
) {
  listTools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
