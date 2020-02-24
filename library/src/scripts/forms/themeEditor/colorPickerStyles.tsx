/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { styleFactory, useThemeCache, variableFactory } from "@library/styles/styleUtils";
import { percent } from "csx";
import { borders, colorOut, textInputSizingFromFixedHeight, unit } from "@library/styles/styleHelpers";
import { themeBuilderVariables } from "@library/forms/themeEditor/themeBuilderStyles";
import { IGlobalBorderStyles } from "@library/styles/globalStyleVars";
import { NestedCSSProperties } from "typestyle/lib/types";

export const colorPickerVariables = useThemeCache(() => {
    // Intentionally not overwritable with theming system.
    return {
        sizing: {
            height: 28,
        },
        swatch: {
            width: 39,
        },
    };
});

export const colorPickerClasses = useThemeCache(() => {
    const vars = colorPickerVariables();
    const style = styleFactory("colorPicker");
    const builderVariables = themeBuilderVariables();
    const inputWidth = builderVariables.width - vars.swatch.width;

    const root = style({
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "stretch",
    });

    const textInput = style("classes", {
        ...textInputSizingFromFixedHeight(vars.sizing.height, builderVariables.fonts.size, 0, vars.sizing.height),
        border: 0,
        width: unit(inputWidth),
        flexBasis: unit(inputWidth),
        borderTopLeftRadius: unit(builderVariables.wrap.borderRadius),
        borderBottomLeftRadius: unit(builderVariables.wrap.borderRadius),
        ...borders(
            {
                all: builderVariables.border,
                right: {
                    radius: builderVariables.wrap.borderRadius,
                },
            },
            builderVariables.border as IGlobalBorderStyles,
        ),
    });

    const swatch = style("swatch", {
        display: "block",
        width: unit(vars.swatch.width),
        flexBasis: unit(vars.swatch.width),
        height: percent(100),
        ...borders(
            {
                right: {
                    radius: builderVariables.wrap.borderRadius,
                },
            },
            builderVariables.border as IGlobalBorderStyles,
        ),
    });

    const realInput = style("realInput", {
        position: "absolute",
        $nest: {
            [`&:focus + .${swatch}`]: {
                borderLeftColor: colorOut(builderVariables.outline.color),
            },
        },
    });

    return {
        root,
        textInput,
        swatch,
        realInput,
    };
});
