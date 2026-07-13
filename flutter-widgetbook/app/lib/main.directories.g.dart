// dart format width=80
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_import, prefer_relative_imports, directives_ordering

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AppGenerator
// **************************************************************************

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:app/widgetbook/button_usecases.dart'
    as _app_widgetbook_button_usecases;
import 'package:app/widgetbook/card_usecases.dart'
    as _app_widgetbook_card_usecases;
import 'package:app/widgetbook/input_usecases.dart'
    as _app_widgetbook_input_usecases;
import 'package:app/widgetbook/signup_screen_usecases.dart'
    as _app_widgetbook_signup_screen_usecases;
import 'package:widgetbook/widgetbook.dart' as _widgetbook;

final directories = <_widgetbook.WidgetbookNode>[
  _widgetbook.WidgetbookCategory(
    name: 'Playground',
    children: [
      _widgetbook.WidgetbookComponent(
        name: 'AppButton',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Playground',
            builder: _app_widgetbook_button_usecases.buttonPlaygroundUseCase,
          ),
        ],
      ),
      _widgetbook.WidgetbookComponent(
        name: 'AppCard',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Playground',
            builder: _app_widgetbook_card_usecases.cardPlaygroundUseCase,
          ),
        ],
      ),
      _widgetbook.WidgetbookComponent(
        name: 'AppInput',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Playground',
            builder: _app_widgetbook_input_usecases.inputPlaygroundUseCase,
          ),
        ],
      ),
    ],
  ),
  _widgetbook.WidgetbookCategory(
    name: 'Screens',
    children: [
      _widgetbook.WidgetbookComponent(
        name: 'SignupScreen',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Signup',
            builder: _app_widgetbook_signup_screen_usecases.signupScreenUseCase,
          ),
        ],
      ),
    ],
  ),
  _widgetbook.WidgetbookCategory(
    name: 'Visual state',
    children: [
      _widgetbook.WidgetbookComponent(
        name: 'AppButton',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Disabled',
            builder: _app_widgetbook_button_usecases.buttonDisabledUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Primary',
            builder: _app_widgetbook_button_usecases.buttonPrimaryUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Secondary',
            builder: _app_widgetbook_button_usecases.buttonSecondaryUseCase,
          ),
        ],
      ),
      _widgetbook.WidgetbookComponent(
        name: 'AppCard',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Default',
            builder: _app_widgetbook_card_usecases.cardDefaultUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Selected',
            builder: _app_widgetbook_card_usecases.cardSelectedUseCase,
          ),
        ],
      ),
      _widgetbook.WidgetbookComponent(
        name: 'AppInput',
        useCases: [
          _widgetbook.WidgetbookUseCase(
            name: 'Default',
            builder: _app_widgetbook_input_usecases.inputDefaultUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Disabled',
            builder: _app_widgetbook_input_usecases.inputDisabledUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Error',
            builder: _app_widgetbook_input_usecases.inputErrorUseCase,
          ),
          _widgetbook.WidgetbookUseCase(
            name: 'Focus',
            builder: _app_widgetbook_input_usecases.inputFocusUseCase,
          ),
        ],
      ),
    ],
  ),
];
