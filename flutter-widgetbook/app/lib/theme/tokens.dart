// Design tokens transcribed from
// docs/design-system-rules.md (共通トークン定義, section 1).
//
// ★ = Figmaから直接抽出した値 (Shopping App UI Kit, fileKey cobQGyPNOOx3MyrDicL75d)
// ☆ = Figmaにサンプルが無く design-system-rules.md で外挿した値
//
// This file intentionally mirrors the token table 1:1 so the mapping from
// Figma fixture -> code stays auditable for the comparison research.
library;

import 'package:flutter/material.dart';

/// Color tokens.
abstract final class AppColors {
  /// ★ Input背景 (`color.surface.input`)
  static const Color surfaceInput = Color.fromRGBO(255, 255, 255, 0.65);

  /// ★ Input/Cardボーダー (`color.border.default`)
  static const Color borderDefault = Color.fromRGBO(217, 217, 217, 0.96);

  /// ★ Primary Buttonボーダー (`color.border.muted`)
  static const Color borderMuted = Color.fromRGBO(217, 217, 217, 0.80);

  /// ★ Primary Button背景 (`color.button.primary.bg`)
  static const Color buttonPrimaryBg = Color.fromRGBO(21, 21, 21, 0.65);

  /// ★ Secondary Button背景 (`color.button.secondary.bg`)
  static const Color buttonSecondaryBg = Color(0xFF151515);

  /// ★ 通常テキスト (`color.text.primary`)
  static const Color textPrimary = Color(0xFF000000);

  /// ★ ボタン内テキスト (`color.text.onDark`)
  static const Color textOnDark = Color(0xFFFFFFFF);

  /// ★ 補助テキスト "hide" 等 (`color.text.muted`)
  static const Color textMuted = Color.fromRGBO(0, 0, 0, 0.44);

  /// ☆ Focus/Selectedの強調色。Secondary Buttonの色を流用 (`color.accent`)
  static const Color accent = Color(0xFF151515);

  /// ☆ Inputのエラー状態。一般的なエラーレッドを採用 (`color.error`)
  static const Color error = Color(0xFFD64545);
}

/// Opacity tokens.
abstract final class AppOpacity {
  /// ☆ Disabled状態の全体不透明度 (`opacity.disabled`)
  static const double disabled = 0.4;
}

/// Radius tokens.
abstract final class AppRadius {
  /// Button / Input (`radius.sm`)
  static const double sm = 6;

  /// Card (`radius.md`)
  static const double md = 8;
}

/// Size tokens.
abstract final class AppSizes {
  /// Primary Buttonの高さ (`size.button.height` primary)
  static const double buttonHeightPrimary = 43;

  /// Secondary Buttonの高さ (`size.button.height` secondary)
  static const double buttonHeightSecondary = 47;

  /// Inputの高さ (`size.input.height`)
  static const double inputHeight = 43;

  /// Card画像サイズ (`size.card.image`)
  static const Size cardImage = Size(327, 264);
}

/// Border width tokens.
abstract final class AppBorderWidth {
  /// ★ (`border.width.default`)
  static const double defaultWidth = 0.5;

  /// ☆ (`border.width.focusOrSelected`)
  static const double focusOrSelected = 1.5;
}

/// Typography tokens.
///
/// フォントファミリーはソースでは SF Pro Display (★) だが、iOS専用フォントの
/// ため3スタック共通ではシステムフォントにフォールバックする方針 (☆)。
/// Flutter では `fontFamily: null` としてプラットフォームデフォルトを使う。
abstract final class AppTypography {
  /// ★ (`font.size.body`)
  static const double sizeBody = 13;

  /// ★ (`font.size.medium`)
  static const double sizeMedium = 14;

  /// ★ (`font.weight.regular`)
  static const FontWeight weightRegular = FontWeight.w400;

  /// ★ (`font.weight.medium`)
  static const FontWeight weightMedium = FontWeight.w500;
}

/// Convenience [ThemeData] wiring the tokens above into Material widgets.
ThemeData buildAppTheme() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: AppColors.accent),
    scaffoldBackgroundColor: Colors.white,
    fontFamily: null, // プラットフォームデフォルト (design-system-rules.md §1)
    textTheme: const TextTheme(
      bodyMedium: TextStyle(
        fontSize: AppTypography.sizeBody,
        fontWeight: AppTypography.weightRegular,
        color: AppColors.textPrimary,
      ),
      titleSmall: TextStyle(
        fontSize: AppTypography.sizeMedium,
        fontWeight: AppTypography.weightMedium,
        color: AppColors.textPrimary,
      ),
    ),
  );
}
