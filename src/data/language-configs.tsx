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
import { langs, type LanguageName } from "@uiw/codemirror-extensions-langs"

export type Language = {
  id: LanguageName
  name: string
  syntax: () => LanguageSupport | StreamLanguage<unknown>
  prettier?: {
    parser: string
    plugin: (() => Promise<PrettierPlugin>) | (() => Promise<PrettierPlugin>)[]
  }
  extensions: {
    key: string
    extension: string
    icon: any
  }[]
}

export const languages: Language[] = [
  {
    id: "javascript",
    name: "JavaScript",
    syntax: () =>
      langs.javascript({
        jsx: true
      }),
    prettier: {
      parser: "babel",
      plugin: [
        () => import("prettier/plugins/babel"),
        () => import("prettier/plugins/estree") as Promise<PrettierPlugin>
      ]
    },
    extensions: [
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
      {
        key: "babel-js",
        extension: ".babel.js",
        icon: babelIcon
      }
    ]
  },
  {
    id: "typescript",
    name: "TypeScript",
    syntax: () =>
      langs.javascript({
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
    extensions: [
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
    id: "python",
    name: "Python",
    syntax: () => langs.python(),
    extensions: [
      {
        key: "py",
        extension: ".py",
        icon: pythonIcon
      }
    ]
  },
  {
    id: "json",
    name: "JSON",
    syntax: () => langs.json(),
    prettier: {
      parser: "json5",
      plugin: [
        () => import("prettier/parser-babel"),
        () => import("prettier/plugins/estree.js") as Promise<PrettierPlugin>
      ]
    },
    extensions: [
      {
        key: "json",
        extension: ".json",
        icon: jsonIcon
      }
    ]
  },
  {
    id: "swift",
    name: "Swift",
    syntax: () => langs.swift(),
    extensions: [
      {
        key: "swift",
        extension: ".swift",
        icon: swiftIcon
      }
    ]
  },
  {
    id: "dockerfile",
    name: "Docker",
    syntax: () => langs.dockerfile(),
    extensions: [
      {
        key: "dockerfile",
        extension: "Dockerfile",
        icon: dockerIcon
      }
    ]
  },
  {
    id: "shell",
    name: "Shell",
    syntax: () => langs.shell(),
    extensions: [
      {
        key: "sh",
        extension: ".sh",
        icon: consoleIcon
      }
    ]
  },
  {
    id: "dart",
    name: "Dart",
    syntax: () => langs.dart(),
    extensions: [
      {
        key: "dart",
        extension: ".dart",
        icon: dartIcon
      }
    ]
  },
  {
    id: "yaml",
    name: "YAML",
    syntax: () => langs.yaml(),
    extensions: [
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
    id: "go",
    name: "Go",
    syntax: () => langs.go(),

    extensions: [
      {
        key: "go",
        extension: ".go",
        icon: goIcon
      }
    ]
  },
  {
    id: "pascal",
    name: "Pascal",
    syntax: () => langs.pascal(),

    extensions: [
      {
        key: "pas",
        extension: ".pas",
        icon: pascalIcon
      }
    ]
  },
  {
    id: "powershell",
    name: "PowerShell",
    syntax: () => langs.powershell(),

    extensions: [
      {
        key: "ps1",
        extension: ".ps1",
        icon: powershellIcon
      }
    ]
  },
  {
    id: "html",
    name: "HTML",
    syntax: () => langs.html(),

    prettier: {
      parser: "html",
      plugin: () => import("prettier/parser-html")
    },
    extensions: [
      {
        key: "html",
        extension: ".html",
        icon: htmlIcon
      }
    ]
  },
  {
    id: "css",
    name: "CSS",
    syntax: () => langs.css(),
    prettier: {
      parser: "css",
      plugin: () => import("prettier/parser-postcss")
    },
    extensions: [
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
    id: "sass",
    name: "SCSS",
    syntax: () => langs.sass(),
    prettier: {
      parser: "scss",
      plugin: () => import("prettier/parser-postcss")
    },
    extensions: [
      {
        key: "scss",
        extension: ".scss",
        icon: sassIcon
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    syntax: () => langs.java(),
    extensions: [
      {
        key: "java",
        extension: ".java",
        icon: javaIcon
      }
    ]
  },
  {
    id: "kotlin",
    name: "Kotlin",
    syntax: () => langs.kotlin(),
    extensions: [
      {
        key: "kt",
        extension: ".kt",
        icon: kotlinIcon
      }
    ]
  },
  {
    id: "rust",
    name: "Rust",
    syntax: () => langs.rust(),
    /* prettier: {
      parser: "jinx-rust",
      plugin: () => import("prettier-plugin-rust")
    }, */
    extensions: [
      {
        key: "rs",
        extension: ".rs",
        icon: rustIcon
      }
    ]
  },
  {
    id: "sql",
    name: "SQL",
    syntax: () => langs.sql(),
    prettier: {
      parser: "sql",
      plugin: () => import("prettier-plugin-sql").then((m) => m.default) as Promise<PrettierPlugin>
    },
    extensions: [
      {
        key: "sql",
        extension: ".sql",
        icon: databaseIcon
      }
    ]
  },
  {
    id: "toml",
    name: "TOML",
    syntax: () => langs.toml(),
    prettier: {
      parser: "toml",
      plugin: () => import("prettier-plugin-toml").then((m) => m.default) as Promise<PrettierPlugin>
    },
    extensions: [
      {
        key: "toml",
        extension: ".toml",
        icon: tomlIcon
      }
    ]
  },
  {
    id: "csharp",
    name: "C#",
    syntax: () => langs.csharp(),
    extensions: [
      {
        key: "cs",
        extension: ".cs",
        icon: csharpIcon
      }
    ]
  },
  {
    id: "php",
    name: "PHP",
    syntax: () => langs.php(),
    prettier: {
      parser: "php",
      plugin: () => import("@prettier/plugin-php")
    },
    extensions: [
      {
        key: "php",
        extension: ".php",
        icon: phpIcon
      }
    ]
  },
  {
    id: "markdown",
    name: "Markdown",
    syntax: () => langs.markdown(),
    prettier: {
      parser: "markdown",
      plugin: () => import("prettier/parser-markdown")
    },
    extensions: [
      {
        key: "md",
        extension: ".md",
        icon: markdownIcon
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    syntax: () => langs.cpp(),
    extensions: [
      {
        key: "cpp",
        extension: ".cpp",
        icon: cppIcon
      }
    ]
  },
  {
    id: "c",
    name: "C",
    syntax: () => langs.c(),
    extensions: [
      {
        key: "c",
        extension: ".c",
        icon: cIcon
      }
    ]
  },
  {
    id: "xml",
    name: "XML",
    syntax: () => langs.xml(),
    prettier: {
      parser: "xml",
      plugin: () => import("@prettier/plugin-xml").then((m) => m.default) as Promise<PrettierPlugin>
    },
    extensions: [
      {
        key: "xml",
        extension: ".xml",
        icon: xmlIcon
      }
    ]
  },
  {
    id: "ruby",
    name: "Ruby",
    syntax: () => langs.ruby(),
    extensions: [
      {
        key: "rb",
        extension: ".rb",
        icon: rubyIcon
      }
    ]
  },
  {
    id: "scala",
    name: "Scala",
    syntax: () => langs.scala(),
    extensions: [
      {
        key: "scala",
        extension: ".scala",
        icon: scalaIcon
      }
    ]
  },
  {
    id: "nginx",
    name: "Nginx",
    syntax: () => langs.nginx(),
    prettier: {
      parser: "nginx",
      plugin: () => import("prettier-plugin-nginx") as Promise<PrettierPlugin>
    },
    extensions: [
      {
        key: "nginx",
        extension: ".nginx",
        icon: nginxIcon
      }
    ]
  },
  {
    id: "solidity",
    name: "Solidity",
    syntax: () => langs.solidity(),
    prettier: {
      parser: "solidity-parse",
      plugin: () => import("prettier-plugin-solidity").then((m) => m.default) as Promise<PrettierPlugin>
    },
    extensions: [
      {
        key: "solidity",
        extension: ".solidity",
        icon: solidityIcon
      }
    ]
  },
  {
    id: "less",
    name: "Less",
    syntax: () => langs.less(),
    prettier: {
      parser: "less",
      plugin: () => import("prettier/parser-postcss")
    },
    extensions: [
      {
        key: "less",
        extension: ".less",
        icon: lessIcon
      }
    ]
  },
  {
    id: "perl",
    name: "Perl",
    syntax: () => langs.perl(),
    extensions: [
      {
        key: "pl",
        extension: ".pl",
        icon: perlIcon
      }
    ]
  }
]

export const languageNames = languages.map((item) => {
  return {
    id: item.id,
    name: item.name
  }
})

export const resolveLanguage = (id: Language["id"]) => {
  return languages.find((lang) => lang.id === id)!
}
