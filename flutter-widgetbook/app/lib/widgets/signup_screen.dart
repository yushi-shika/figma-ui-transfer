// SignupScreen — see
// docs/figma-fixtures/screens/signup/design-context.md (fileKey
// cobQGyPNOOx3MyrDicL75d, node 2:4).
//
// This composes the existing `AppInput`(default state)/`AppButton`(primary
// variant) atoms into one full 375x812 screen, matching the fixture's
// absolute px positions 1:1. It intentionally does NOT introduce new design
// tokens: every color/radius/border/font value on this screen already comes
// from AppInput/AppButton/tokens.dart.
library;

import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import 'app_button.dart';
import 'app_input.dart';

/// Reference canvas size the fixture's absolute coordinates were authored
/// against (iPhone-ish portrait ratio).
const Size kSignupScreenCanvasSize = Size(375, 812);

class SignupScreen extends StatelessWidget {
  const SignupScreen({
    super.key,
    this.imagePackage,
    this.onCreateAccount,
  });

  /// Pass `'app'` when this widget is consumed from a different root
  /// package (e.g. the `widgetbook/` workspace), so Flutter resolves the
  /// background/logo assets declared in this package's own pubspec.yaml.
  /// Leave null when `app` itself is the running root package.
  final String? imagePackage;
  final VoidCallback? onCreateAccount;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: kSignupScreenCanvasSize.width,
      height: kSignupScreenCanvasSize.height,
      child: ColoredBox(
        color: Colors.white,
        child: Stack(
          // Matches the fixture's `size-full relative` root: children that
          // spill outside the 375x812 canvas (the oversized background
          // photo) are clipped to the canvas bounds.
          clipBehavior: Clip.hardEdge,
          children: [
            // 背景写真(全面, object-cover相当)
            Positioned(
              left: -52,
              top: -60,
              width: 797,
              height: 1039,
              child: Image.asset(
                'assets/images/signup_background.png',
                package: imagePackage,
                fit: BoxFit.cover,
              ),
            ),

            // ロゴ
            Positioned(
              left: 121,
              top: 61,
              width: 133,
              height: 130,
              child: Image.asset(
                'assets/images/signup_logo.png',
                package: imagePackage,
                fit: BoxFit.cover,
              ),
            ),

            // Full Name input
            const Positioned(
              left: 48,
              top: 348,
              width: 288,
              child: AppInput(label: 'Full Name', initialValue: 'Reggie James'),
            ),

            // Email input
            const Positioned(
              left: 48,
              top: 432,
              width: 288,
              child: AppInput(
                label: 'Email',
                initialValue: 'reggiejames001@website.com',
              ),
            ),

            // Password input (AppInput自身がobscureText時に右端"hide"トグルを描画)
            const Positioned(
              left: 48,
              top: 528,
              width: 288,
              child: AppInput(
                label: 'Password',
                initialValue: 'theBirdiSth3W0rD',
                obscureText: true,
              ),
            ),

            // Create Accountボタン(Primary, 中央寄せ)
            Positioned(
              left: 72,
              top: 648,
              width: 240,
              height: AppSizes.buttonHeightPrimary,
              child: AppButton(
                label: 'Create Account',
                variant: AppButtonVariant.primary,
                onPressed: onCreateAccount,
              ),
            ),

            // サブテキスト: "Already have an account **Sign In**"
            const Positioned(
              left: 98,
              top: 701,
              child: Text.rich(
                TextSpan(
                  style: TextStyle(
                    color: AppColors.textPrimary,
                    fontSize: AppTypography.sizeBody,
                    fontWeight: AppTypography.weightRegular,
                  ),
                  children: [
                    TextSpan(text: 'Already have an account '),
                    TextSpan(
                      text: 'Sign In',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),

            // サブテキスト: "Privacy Policy"
            const Positioned(
              left: 147,
              top: 768,
              child: Text(
                'Privacy Policy',
                style: TextStyle(
                  color: AppColors.textPrimary,
                  fontSize: AppTypography.sizeBody,
                  fontWeight: AppTypography.weightRegular,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
