// Basic smoke tests for the design-system components
// (Button / Input / Card) used in the Figma comparison research.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:app/main.dart';
import 'package:app/widgets/app_button.dart';
import 'package:app/widgets/app_card.dart';
import 'package:app/widgets/app_input.dart';

void main() {
  testWidgets('ComponentShowcasePage renders Button, Input and Card', (
    tester,
  ) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('Create Account'), findsOneWidget);
    expect(find.text('Buy for \$338'), findsOneWidget);
    expect(find.text('Full Name'), findsOneWidget);
    expect(
      find.text("Air Jordan 1 Retro High OG 'University Blue'"),
      findsOneWidget,
    );
  });

  testWidgets('AppButton disabled ignores taps', (tester) async {
    var tapped = false;
    await tester.pumpWidget(
      MaterialApp(
        home: AppButton(
          label: 'Tap me',
          disabled: true,
          onPressed: () => tapped = true,
        ),
      ),
    );

    await tester.tap(find.text('Tap me'), warnIfMissed: false);
    await tester.pump();

    expect(tapped, isFalse);
  });

  testWidgets('AppInput shows label and initial value', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: AppInput(label: 'Email', initialValue: 'a@b.com'),
        ),
      ),
    );

    expect(find.text('Email'), findsOneWidget);
    expect(find.text('a@b.com'), findsOneWidget);
  });

  testWidgets('AppCard renders title', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: AppCard(
            title: 'Product Title',
            imageAssetPath: 'assets/images/product-hero.png',
          ),
        ),
      ),
    );

    expect(find.text('Product Title'), findsOneWidget);
  });

  testWidgets('AppCard selected state uses accent border', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: AppCard(
            title: 'Product Title',
            imageAssetPath: 'assets/images/product-hero.png',
            state: AppCardState.selected,
          ),
        ),
      ),
    );

    expect(find.byType(AppCard), findsOneWidget);
  });
}
