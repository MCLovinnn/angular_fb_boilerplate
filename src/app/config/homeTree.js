export const homeTreeConfig = {
    mode: {
        name: 'home_tree_mode',
        htmlType: 'select',
        validators: {
            required: true
        },
        options: [
            {
                value: 'config',
                key: 'home_tree_mode_Opt_config'
            },
            {
                value: 'translate',
                key: 'home_tree_mode_Opt_translate'
            }
        ]
    },
    lang: {
        name: 'home_tree_lang',
        htmlType: 'select',
        validators: {
            required: true
        },
        options: [
            {
                value: 'de',
                key: 'home_tree_lang_Opt_de'
            },
            {
                value: 'en',
                key: 'home_tree_lang_Opt_en'
            }
        ]
    }
}
