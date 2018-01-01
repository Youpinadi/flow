export const data = {
    // Which graph renderer to use for this graph (currently only 'global' and 'region')
    renderer: 'global',
    // since the root object is a node, it has a name too.
    name: 'edge',
    // OPTIONAL: The maximum volume seen recently to relatively measure particle density. This 'global' maxVolume is optional because it can be calculated by using all of the required sub-node maxVolumes.
    maxVolume: 100000,
    // OPTIONAL: The name of the entry node to the global graph. If omitted, will assume an 'INTERNET' node
    entryNode: 'INTERNET',
    // list of nodes for this graph
    nodes: [
        {
            renderer: 'region',
            layout: 'ltrTree',
            // OPTIONAL Override the default layout used for the renderer.
            name: 'us-west-2',
            // Unix timestamp. Only checked at this level of nodes. Last time the data was updated (Needed because the client could be passed stale data when loaded)
            updated: 1462471847,
            // The maximum volume seen recently to relatively measure particle density
            maxVolume: 100000,
            nodes: [
                {
                    name: 'INTERNET' // Required... this is the entry node
                },
                {
                    name: 'apiproxy-prod',
                    // OPTIONAL Override the name on the label
                    displayName: 'proxy',
                    //  The class of the node. will default to 'normal' if not provided. The coloring of the UI is based on 'normal', 'warning', and 'danger', so if you want to match the UI coloring, use those class names. Any class you provide will expect to have a style 'colorClassName' available, e.g. if the class is 'fuzzy', you should also call 'vizceral.updateStyles({ colorTraffic: { fuzzy: '#aaaaaa' } })'
                    class: 'normal',
                    // OPTIONAL Any data that may be handled by a plugin or other data that isn't important to vizceral itself (if you want to show stuff on the page that contains vizceral, for example). Since it is completely optional and not handled by vizceral, you technically could use any index, but this is the convention we use.
                    metadata: {}
                },
                {
                    name: 'apiproxy-prod2',
                    displayName: 'proxy2',
                    //  The class of the node. will default to 'normal' if not provided. The coloring of the UI is based on 'normal', 'warning', and 'danger', so if you want to match the UI coloring, use those class names. Any class you provide will expect to have a style 'colorClassName' available, e.g. if the class is 'fuzzy', you should also call 'vizceral.updateStyles({ colorTraffic: { fuzzy: '#aaaaaa' } })'
                    class: 'normal',
                    // OPTIONAL Any data that may be handled by a plugin or other data that isn't important to vizceral itself (if you want to show stuff on the page that contains vizceral, for example). Since it is completely optional and not handled by vizceral, you technically could use any index, but this is the convention we use.
                    metadata: {}
                },
                {
                    name: 'apiproxy-prod3',
                    displayName: 'proxy3',
                    //  The class of the node. will default to 'normal' if not provided. The coloring of the UI is based on 'normal', 'warning', and 'danger', so if you want to match the UI coloring, use those class names. Any class you provide will expect to have a style 'colorClassName' available, e.g. if the class is 'fuzzy', you should also call 'vizceral.updateStyles({ colorTraffic: { fuzzy: '#aaaaaa' } })'
                    class: 'normal',
                    // OPTIONAL Any data that may be handled by a plugin or other data that isn't important to vizceral itself (if you want to show stuff on the page that contains vizceral, for example). Since it is completely optional and not handled by vizceral, you technically could use any index, but this is the convention we use.
                    metadata: {}
                }
            ],
            connections: [
                {
                    source: 'INTERNET',
                    target: 'apiproxy-prod',
                    metrics: {
                        normal: 5000,
                        danger: 5,
                        warning: 0
                    }
                },
                {
                    source: 'INTERNET',
                    target: 'apiproxy-prod2',
                    metrics: {
                        normal: 5000,
                        danger: 5,
                        warning: 0
                    }
                },
                {
                    source: 'INTERNET',
                    target: 'apiproxy-prod3',
                    metrics: {
                        normal: 0,
                        danger: 15000,
                        warning: 0
                    }
                }
            ]
        }
    ]
};
