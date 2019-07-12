export interface OneToOne {
  field: string
}

export interface OneToMany {
  field: string
}

export interface ManyToMany {
  tablename: string
}

export interface Directive {
  OneToOne?: OneToOne
  OneToMany?: OneToMany
  ManyToMany?: ManyToMany
}

export interface Field {
  name: string
  // tslint:disable-next-line
  type: string
  isArray: boolean
  isType: boolean
  isNull: boolean
  directives: Directive
  hasDirectives: boolean
}

export interface Config {
  paginate: boolean
  create: boolean
  update: boolean
  //tslint:disable-next-line
  delete: boolean
  find: boolean
  findAll: boolean
}

export interface Type {
  name: string
  fields: Field[]
  config: Config
}