import type { LanguageSupport, StreamLanguage } from "@codemirror/language"
import type { Plugin as PrettierPlugin } from "prettier"
import babelIcon from "@/assets/icons/babel.svg"
import cIcon from "@/assets/icons/c.svg"
import consoleIcon from "@/assets/icons/console.svg"
import cppIcon from "@/assets/icons/cpp.svg"
import csharpIcon from "@/assets/icons/csharp.svg"
import cssIcon from "@/assets/icons/css.svg"
import dartIcon from "@/assets/icons/dart.svg"
import databaseIcon from "@/assets/icons/database.svg"
import dockerIcon from "@/assets/icons/docker.svg"
import goIcon from "@/assets/icons/go.svg"
import htmlIcon from "@/assets/icons/html.svg"
import javaIcon from "@/assets/icons/java.svg"
import javascriptIcon from "@/assets/icons/javascript.svg"
import jsonIcon from "@/assets/icons/json.svg"
import kotlinIcon from "@/assets/icons/kotlin.svg"
import lessIcon from "@/assets/icons/less.svg"
import markdownIcon from "@/assets/icons/markdown.svg"
import nginxIcon from "@/assets/icons/nginx.svg"
import pascalIcon from "@/assets/icons/pascal.svg"
import perlIcon from "@/assets/icons/perl.svg"
import phpIcon from "@/assets/icons/php.svg"
import powershellIcon from "@/assets/icons/powershell.svg"
import pythonIcon from "@/assets/icons/python.svg"
import reactIcon from "@/assets/icons/react.svg"
import reduxActionIcon from "@/assets/icons/redux-action.svg"
import reduxReducerIcon from "@/assets/icons/redux-reducer.svg"
import reduxSelectorIcon from "@/assets/icons/redux-selector.svg"
import reduxStoreIcon from "@/assets/icons/redux-store.svg"
import rubyIcon from "@/assets/icons/ruby.svg"
import rustIcon from "@/assets/icons/rust.svg"
import sassIcon from "@/assets/icons/sass.svg"
import scalaIcon from "@/assets/icons/scala.svg"
import solidityIcon from "@/assets/icons/solidity.svg"
import stylusIcon from "@/assets/icons/stylus.svg"
import svelteIcon from "@/assets/icons/svelte.svg"
import swiftIcon from "@/assets/icons/swift.svg"
import testJsIcon from "@/assets/icons/test-js.svg"
import testJsxIcon from "@/assets/icons/test-jsx.svg"
import testTsIcon from "@/assets/icons/test-ts.svg"
import tomlIcon from "@/assets/icons/toml.svg"
import typescriptIcon from "@/assets/icons/typescript.svg"
import vueIcon from "@/assets/icons/vue.svg"
import xmlIcon from "@/assets/icons/xml.svg"
import yamlIcon from "@/assets/icons/yaml.svg"
import { langs } from "@uiw/codemirror-extensions-langs"

export type LanguageConfig = {
  label: string
  lang: LanguageSupport | StreamLanguage<unknown>
  prettier?: {
    parser: string
    plugin: (() => Promise<PrettierPlugin>) | (() => Promise<PrettierPlugin>)[]
  }
  fileExtensions: {
    key: string
    extension: string
    icon: any
  }[]
}

const languageConfigs: LanguageConfig[] = [
  {
    label: "JavaScript",
    lang: langs.javascript({ jsx: true }),
    prettier: {
      parser: "babel",
      plugin: [
        () => import("prettier/plugins/babel"),
        () => import("prettier/plugins/estree") as Promise<PrettierPlugin>
      ]
    },
    fileExtensions: [
      {
        key: "js",
        extension: ".js",
        icon: javascriptIcon
      },
      {
        key: "jsx",
        extension: ".jsx",
        icon: reactIcon
      },
      {
        key: "test-jsx",
        extension: ".spec.jsx",
        icon: testJsxIcon
      },
      {
        key: "test-js",
        extension: ".spec.js",
        icon: testJsIcon
      },
      {
        key: "vue",
        extension: ".vue",
        icon: vueIcon
      },
      {
        key: "redux-store",
        extension: ".store.js",
        icon: reduxStoreIcon
      },
      {
        key: "redux-reducer",
        extension: ".reducer.js",
        icon: reduxReducerIcon
      },
      {
        key: "redux-action",
        extension: ".action.js",
        icon: reduxActionIcon
      },
      {
        key: "redux-selector",
        extension: ".selector.js",
        icon: reduxSelectorIcon
      },
      {
        key: "svelte",
        extension: ".svelte",
        icon: svelteIcon
      },
      /* {
        key: "mjs",
        extension: ".mjs",
        icon: javascriptIcon
      },
      {
        key: "cjs",
        extension: ".cjs",
        icon: javascriptIcon
      }, */
      {
        key: "babel-js",
        extension: ".babel.js",
        icon: babelIcon
      }
    ]
  },
  {
    label: "TypeScript",
    lang: langs.javascript({
      jsx: true,
      typescript: true
    }),
    prettier: {
      parser: "typescript",
      plugin: [
        () => import("prettier/parser-typescript"),
        () => import("prettier/plugins/estree") as Promise<PrettierPlugin>
      ]
    },
    fileExtensions: [
      {
        key: "ts",
        extension: ".ts",
        icon: typescriptIcon
      },
      {
        key: "tsx",
        extension: ".tsx",
        icon: reactIcon
      },
      {
        key: "test-ts",
        extension: ".spec.ts",
        icon: testTsIcon
      },
      {
        key: "test-tsx",
        extension: ".spec.tsx",
        icon: testJsxIcon
      },
      {
        key: "vue",
        extension: ".vue",
        icon: vueIcon
      },
      {
        key: "svelte",
        extension: ".svelte",
        icon: svelteIcon
      },
      {
        key: "redux-store",
        extension: ".store.ts",
        icon: reduxStoreIcon
      },
      {
        key: "redux-reducer",
        extension: ".reducer.ts",
        icon: reduxReducerIcon
      },
      {
        key: "redux-action",
        extension: ".action.ts",
        icon: reduxActionIcon
      },
      {
        key: "redux-selector",
        extension: ".selector.ts",
        icon: reduxSelectorIcon
      }
    ]
  },
  {
    label: "Python",
    lang: langs.python(),

    fileExtensions: [
      {
        key: "py",
        extension: ".py",
        icon: pythonIcon
      }
    ]
  },
  {
    label: "JSON",
    lang: langs.json(),
    prettier: {
      parser: "json5",
      plugin: () => import("prettier/parser-babel")
    },
    fileExtensions: [
      {
        key: "json",
        extension: ".json",
        icon: jsonIcon
      }
    ]
  },
  {
    label: "Swift",
    lang: langs.swift(),
    fileExtensions: [
      {
        key: "swift",
        extension: ".swift",
        icon: swiftIcon
      }
    ]
  },
  {
    label: "Docker",
    lang: langs.dockerfile(),
    fileExtensions: [
      {
        key: "dockerfile",
        extension: "Dockerfile",
        icon: dockerIcon
      }
    ]
  },
  {
    label: "Shell",
    lang: langs.shell(),
    fileExtensions: [
      {
        key: "sh",
        extension: ".sh",
        icon: consoleIcon
      }
    ]
  },
  {
    label: "Dart",
    lang: langs.dart(),
    fileExtensions: [
      {
        key: "dart",
        extension: ".dart",
        icon: dartIcon
      }
    ]
  },
  {
    label: "YAML",
    lang: langs.yaml(),
    fileExtensions: [
      {
        key: "yaml",
        extension: ".yaml",
        icon: yamlIcon
      },

      {
        key: "yml",
        extension: ".yml",
        icon: yamlIcon
      }
    ]
  },
  {
    label: "Go",
    lang: langs.go(),

    fileExtensions: [
      {
        key: "go",
        extension: ".go",
        icon: goIcon
      }
    ]
  },
  {
    label: "Pascal",
    lang: langs.pascal(),

    fileExtensions: [
      {
        key: "pas",
        extension: ".pas",
        icon: pascalIcon
      }
    ]
  },
  {
    label: "PowerShell",
    lang: langs.powershell(),

    fileExtensions: [
      {
        key: "ps1",
        extension: ".ps1",
        icon: powershellIcon
      }
    ]
  },
  {
    label: "HTML",
    lang: langs.html(),

    prettier: {
      parser: "html",
      plugin: () => import("prettier/parser-html")
    },
    fileExtensions: [
      {
        key: "html",
        extension: ".html",
        icon: htmlIcon
      }
    ]
  },
  {
    label: "CSS",
    lang: langs.css(),
    prettier: {
      parser: "css",
      plugin: () => import("prettier/parser-postcss")
    },
    fileExtensions: [
      {
        key: "css",
        extension: ".css",
        icon: cssIcon
      },
      {
        key: "stylus",
        extension: ".styl",
        icon: stylusIcon
      }
    ]
  },
  {
    label: "SCSS",
    lang: langs.sass(),
    prettier: {
      parser: "scss",
      plugin: () => import("prettier/parser-postcss")
    },
    fileExtensions: [
      {
        key: "scss",
        extension: ".scss",
        icon: sassIcon
      }
    ]
  },
  {
    label: "Java",
    lang: langs.java(),
    fileExtensions: [
      {
        key: "java",
        extension: ".java",
        icon: javaIcon
      }
    ]
  },
  {
    label: "Kotlin",
    lang: langs.kotlin(),
    fileExtensions: [
      {
        key: "kt",
        extension: ".kt",
        icon: kotlinIcon
      }
    ]
  },
  {
    label: "Rust",
    lang: langs.rust(),
    prettier: {
      parser: "jinx-rust",
      plugin: () => import("prettier-plugin-rust")
    },
    fileExtensions: [
      {
        key: "rs",
        extension: ".rs",
        icon: rustIcon
      }
    ]
  },
  {
    label: "SQL",
    lang: langs.sql(),
    prettier: {
      parser: "sql",
      plugin: () => import("prettier-plugin-sql") as Promise<PrettierPlugin>
    },
    fileExtensions: [
      {
        key: "sql",
        extension: ".sql",
        icon: databaseIcon
      }
    ]
  },
  {
    label: "TOML",
    lang: langs.toml(),
    prettier: {
      parser: "toml",
      plugin: () => import("prettier-plugin-toml") as Promise<PrettierPlugin>
    },
    fileExtensions: [
      {
        key: "toml",
        extension: ".toml",
        icon: tomlIcon
      }
    ]
  },
  {
    label: "C#",
    lang: langs.csharp(),
    fileExtensions: [
      {
        key: "cs",
        extension: ".cs",
        icon: csharpIcon
      }
    ]
  },
  {
    label: "PHP",
    lang: langs.php(),
    prettier: {
      parser: "php",
      plugin: () => import("@prettier/plugin-php")
    },
    fileExtensions: [
      {
        key: "php",
        extension: ".php",
        icon: phpIcon
      }
    ]
  },
  {
    label: "Markdown",
    lang: langs.markdown(),
    prettier: {
      parser: "markdown",
      plugin: () => import("prettier/parser-markdown")
    },
    fileExtensions: [
      {
        key: "md",
        extension: ".md",
        icon: markdownIcon
      }
    ]
  },
  {
    label: "C++",
    lang: langs.cpp(),
    fileExtensions: [
      {
        key: "cpp",
        extension: ".cpp",
        icon: cppIcon
      }
    ]
  },
  {
    label: "C",
    lang: langs.c(),
    fileExtensions: [
      {
        key: "c",
        extension: ".c",
        icon: cIcon
      }
    ]
  },
  {
    label: "XML",
    lang: langs.xml(),
    prettier: {
      parser: "xml",
      plugin: () => import("@prettier/plugin-xml").then((m) => m.default) as Promise<PrettierPlugin>
    },
    fileExtensions: [
      {
        key: "xml",
        extension: ".xml",
        icon: xmlIcon
      }
    ]
  },
  {
    label: "Ruby",
    lang: langs.ruby(),
    fileExtensions: [
      {
        key: "rb",
        extension: ".rb",
        icon: rubyIcon
      }
    ]
  },
  {
    label: "Scala",
    lang: langs.scala(),
    fileExtensions: [
      {
        key: "scala",
        extension: ".scala",
        icon: scalaIcon
      }
    ]
  },
  {
    label: "Nginx",
    lang: langs.nginx(),
    prettier: {
      parser: "nginx",
      plugin: () => import("prettier-plugin-nginx") as Promise<PrettierPlugin>
    },
    fileExtensions: [
      {
        key: "nginx",
        extension: ".nginx",
        icon: nginxIcon
      }
    ]
  },
  {
    label: "Solidity",
    lang: langs.solidity(),
    prettier: {
      parser: "solidity",
      plugin: () => import("prettier-plugin-solidity")
    },
    fileExtensions: [
      {
        key: "solidity",
        extension: ".solidity",
        icon: solidityIcon
      }
    ]
  },
  {
    label: "Less",
    lang: langs.less(),
    prettier: {
      parser: "less",
      plugin: () => import("prettier/parser-postcss")
    },
    fileExtensions: [
      {
        key: "less",
        extension: ".less",
        icon: lessIcon
      }
    ]
  },
  {
    label: "Perl",
    lang: langs.perl(),
    fileExtensions: [
      {
        key: "pl",
        extension: ".pl",
        icon: perlIcon
      }
    ]
  }
]

export default languageConfigs
