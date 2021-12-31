# allegro-actions/validate-using-json-schema

This action validates JSON and YAML files using [JSON Schema](https://json-schema.org/).

## Basic usage

```yaml
- name: Validate
  uses: allegro-actions/validate-using-json-schema@v1
  with:
    schema: schema.json
    target: target.json
```

## Inputs

* `schema`: path or URL pointing to a JSON Schema (only Draft-06 and Draft-07 are currently supported)
* `target`: path/paths of files to be validated, multiple files can be validated at once by passing a multi-line string
* `strict`: (Optional) set to `true` to enable strict validation
