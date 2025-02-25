# Avalonia Project Helper

## Overview

Avalonia Project Helper — это расширение для Visual Studio Code, предназначенное для упрощения создания проектов Avalonia UI. Оно предоставляет удобный интерфейс для выбора параметров проекта, таких как тип проекта, версия .NET, MVVM-фреймворк и другие настройки.

## Features

- Создание проектов Avalonia UI с помощью `dotnet new`.
- Поддержка трех типов проектов:
  - `avalonia.app` — Базовое приложение Avalonia.
  - `avalonia.mvvm` — Приложение Avalonia с архитектурой MVVM.
  - `avalonia.xplat` — Кроссплатформенный проект Avalonia.
- Выбор версии .NET (`net9.0`, `net8.0`).
- Поддержка MVVM-фреймворков (`CommunityToolkit`, `ReactiveUI`).
- Опция удаления стандартного `ViewLocator`.
- Поддержка скомпилированных привязок (`compiled bindings`).

## Requirements

Для работы расширения требуется:
- Установленный .NET SDK (версии 8.0 или 9.0).
- Visual Studio Code (последняя версия).
- Установленный пакет шаблонов Avalonia (`dotnet new install Avalonia.Templates`).

## Installation

1. Установите .NET SDK, если он еще не установлен.
2. Установите шаблоны Avalonia с помощью команды:
   ```sh
   dotnet new install Avalonia.Templates
   ```
3. Установите это расширение через Visual Studio Code Marketplace или вручную.

## Usage

1. Откройте командную палитру (`Ctrl+Shift+P`).
2. Введите `Avalonia Project Helper: Create Project` и выберите команду.
3. Выберите папку для проекта.
4. Введите имя проекта.
5. Выберите тип проекта, версию .NET, MVVM-фреймворк (если требуется) и другие настройки.
6. Дождитесь завершения генерации проекта.
7. Проект автоматически откроется в новой вкладке VS Code.

## Extension Settings

На данный момент расширение не добавляет дополнительных настроек в конфигурацию VS Code.

## Known Issues

- В случае отсутствия .NET SDK или шаблонов Avalonia, создание проекта завершится с ошибкой.
- Расширение не проверяет корректность введенного имени проекта.

## Release Notes

### 0.0.1
- Первоначальный выпуск.
- Поддержка базовых шаблонов Avalonia.
- Выбор .NET версии.
- Поддержка MVVM-фреймворков.
- Опция удаления `ViewLocator`.
- Поддержка скомпилированных привязок.

---

## Additional Information

- [Документация по применению шаблонов Avalonia UI](https://github.com/AvaloniaUI/avalonia-dotnet-templates/blob/main/readme.md)


