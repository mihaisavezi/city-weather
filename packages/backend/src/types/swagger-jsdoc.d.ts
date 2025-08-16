declare module 'swagger-jsdoc' {
  interface SwaggerDefinition {
    openapi?: string;
    info?: {
      title?: string;
      version?: string;
      description?: string;
    };
    servers?: Array<{
      url: string;
      description?: string;
    }>;
    components?: {
      schemas?: Record<string, any>;
      securitySchemes?: Record<string, any>;
    };
    security?: Array<Record<string, string[]>>;
  }

  interface Options {
    swaggerDefinition: SwaggerDefinition;
    apis: string[];
  }

  function swaggerJsdoc(options: Options): any;
  export = swaggerJsdoc;
}