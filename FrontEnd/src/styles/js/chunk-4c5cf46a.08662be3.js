(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-4c5cf46a"], {
        1276: function(a, t, s) {
            "use strict";
            var i = s("d784"),
                e = s("44e7"),
                n = s("825a"),
                l = s("1d80"),
                r = s("4840"),
                o = s("8aa5"),
                c = s("50c4"),
                d = s("14c3"),
                p = s("9263"),
                v = s("d039"),
                m = [].push,
                C = Math.min,
                u = 4294967295,
                g = !v((function() {
                    return !RegExp(u, "y")
                }));
            i("split", 2, (function(a, t, s) {
                var i;
                return i = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(a, s) {
                    var i = String(l(this)),
                        n = void 0 === s ? u : s >>> 0;
                    if (0 === n) return [];
                    if (void 0 === a) return [i];
                    if (!e(a)) return t.call(i, a, n);
                    var r, o, c, d = [],
                        v = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (a.sticky ? "y" : ""),
                        C = 0,
                        g = new RegExp(a.source, v + "g");
                    while (r = p.call(g, i)) {
                        if (o = g.lastIndex, o > C && (d.push(i.slice(C, r.index)), r.length > 1 && r.index < i.length && m.apply(d, r.slice(1)), c = r[0].length, C = o, d.length >= n)) break;
                        g.lastIndex === r.index && g.lastIndex++
                    }
                    return C === i.length ? !c && g.test("") || d.push("") : d.push(i.slice(C)), d.length > n ? d.slice(0, n) : d
                } : "0".split(void 0, 0).length ? function(a, s) {
                    return void 0 === a && 0 === s ? [] : t.call(this, a, s)
                } : t, [function(t, s) {
                    var e = l(this),
                        n = void 0 == t ? void 0 : t[a];
                    return void 0 !== n ? n.call(t, e, s) : i.call(String(e), t, s)
                }, function(a, e) {
                    var l = s(i, a, this, e, i !== t);
                    if (l.done) return l.value;
                    var p = n(a),
                        v = String(this),
                        m = r(p, RegExp),
                        h = p.unicode,
                        b = (p.ignoreCase ? "i" : "") + (p.multiline ? "m" : "") + (p.unicode ? "u" : "") + (g ? "y" : "g"),
                        f = new m(g ? p : "^(?:" + p.source + ")", b),
                        _ = void 0 === e ? u : e >>> 0;
                    if (0 === _) return [];
                    if (0 === v.length) return null === d(f, v) ? [v] : [];
                    var S = 0,
                        k = 0,
                        w = [];
                    while (k < v.length) {
                        f.lastIndex = g ? k : 0;
                        var x, M = d(f, g ? v : v.slice(k));
                        if (null === M || (x = C(c(f.lastIndex + (g ? 0 : k)), v.length)) === S) k = o(v, k, h);
                        else {
                            if (w.push(v.slice(S, k)), w.length === _) return w;
                            for (var P = 1; P <= M.length - 1; P++)
                                if (w.push(M[P]), w.length === _) return w;
                            k = S = x
                        }
                    }
                    return w.push(v.slice(S)), w
                }]
            }), !g)
        },
        6533: function(a, t, s) {
            "use strict";
            s.r(t);
            var i = function() {
                    var a = this,
                        t = a.$createElement,
                        s = a._self._c || t;
                    return s("div", {
                        staticClass: "app-admin-wrap layout-sidebar-large clearfix"
                    }, [s("top-nav"), s("sidebar"), s("main", [s("div", {
                        staticClass: "main-content-wrap d-flex flex-column flex-grow-1",
                        class: {
                            "sidenav-open": a.getSideBarToggleProperties.isSideNavOpen
                        }
                    }, [s("transition", {
                        attrs: {
                            name: "page",
                            mode: "out-in"
                        }
                    }, [s("router-view")], 1), s("div", {
                        staticClass: "flex-grow-1"
                    }), s("appFooter")], 1)])], 1)
                },
                e = [],
                n = s("5530"),
                l = function() {
                    var a = this,
                        t = a.$createElement,
                        s = a._self._c || t;
                    return s("div", {
                        staticClass: "side-content-wrap",
                        on: {
                            mouseenter: function(t) {
                                a.isMenuOver = !0
                            },
                            mouseleave: function(t) {
                                a.isMenuOver = !1
                            },
                            touchstart: function(t) {
                                a.isMenuOver = !0
                            }
                        }
                    }, [s("vue-perfect-scrollbar", {
                        ref: "myData",
                        staticClass: "sidebar-left rtl-ps-none ps scroll",
                        class: {
                            open: a.getSideBarToggleProperties.isSideNavOpen
                        },
                        attrs: {
                            settings: {
                                suppressScrollX: !0,
                                wheelPropagation: !1
                            }
                        }
                    }, [s("div", [s("ul", {
                        staticClass: "navigation-left"
                    }, [s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "dashboards" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "dashboards",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Bar-Chart"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v(a._s(a.$t("dashboard")))])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "ui-kits" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "ui-kits",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Library"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("UI kits")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "extrakits" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "extrakits",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Suitcase"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Extra kits")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "apps" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "apps",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Computer-Secure"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Apps")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "charts" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "charts",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Pie-Chart-2"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Charts")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "widgets" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "widgets",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Windows-2"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Widgets")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "forms" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "forms",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-Clipboard-File--Text"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Forms")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "datatables" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "datatables",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-Horizontal-Text"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Datatables")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "sessions" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "sessions",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Administrator"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Sessions")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "pages" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "pages",
                            "data-submenu": !0
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Double-Tap"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Pages")])]), s("div", {
                        staticClass: "triangle"
                    })]), s("li", {
                        staticClass: "nav-item",
                        class: {
                            active: "doc" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-item": "doc",
                            "data-submenu": !1
                        },
                        on: {
                            mouseenter: a.toggleSubMenu
                        }
                    }, [s("a", {
                        staticClass: "nav-item-hold",
                        attrs: {
                            href: "http://demos.ui-lib.com/gull-vue-doc/",
                            target: "_blank"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Safe-Box1"
                    }), s("span", {
                        staticClass: "nav-text"
                    }, [a._v("Doc")])]), s("div", {
                        staticClass: "triangle"
                    })])])])]), s("vue-perfect-scrollbar", {
                        staticClass: "sidebar-left-secondary ps rtl-ps-none",
                        class: {
                            open: a.getSideBarToggleProperties.isSecondarySideNavOpen
                        },
                        attrs: {
                            settings: {
                                suppressScrollX: !0,
                                wheelPropagation: !1
                            }
                        }
                    }, [s("div", {
                        ref: "sidebarChild"
                    }, [s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "dashboards" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "dashboards"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/dashboards/dashboard.v1"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Clock-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(a._s(a.$t("dashboardItems.versionOne")))])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/dashboards/dashboard.v2"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Clock-4"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(a._s(a.$t("dashboardItems.versionTwo")))])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/dashboards/dashboard.v3"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Over-Time"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(a._s(a.$t("dashboardItems.versionThree")))])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/dashboards/dashboard.v4"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Clock"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(a._s(a.$t("dashboardItems.versionFour")))])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "forms" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "forms"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/basicForms"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-Clipboard-Text--Image"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Basic Elements")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/formLayouts"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Vertical"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Form Layouts")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/basicActionBar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Receipt-4"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Basic Action Bar")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/formComponent"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Close-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Form Validation")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/formWizard"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Width-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Form Wizard")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/tagInput"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Tag-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Tag Input")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/mask"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Pen-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Form Mask")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/datepicker"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Calendar-4"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Datepicker")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/forms/V2Datepicker"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Calendar-4"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("V2Datepicker")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "datatables" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "forms"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/datatables/paging"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Four-Square-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Paging")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/datatables/filter"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Vertical"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Filter")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/datatables/list"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Vertical"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("List")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/datatables/vue-good-table"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Horizontal"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Vue Good Table")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "apps" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "apps"
                        }
                    }, [s("li", {
                        staticClass: "nav-item dropdown-sidemenu",
                        on: {
                            click: function(t) {
                                return t.preventDefault(), a.toggleSidebarDropdwon(t)
                            }
                        }
                    }, [s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Invoice")]), s("i", {
                        staticClass: "dd-arrow i-Arrow-Down"
                    })]), s("ul", {
                        staticClass: "submenu"
                    }, [s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/invoice"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Files"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Invoice List")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/createInvoice"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Create Invoice")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/printInvoice"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-JPG"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Print Invoice")])])], 1)])]), s("li", {
                        staticClass: "nav-item dropdown-sidemenu",
                        on: {
                            click: function(t) {
                                return t.preventDefault(), a.toggleSidebarDropdwon(t)
                            }
                        }
                    }, [s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-CSV"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(" Contacts "), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])]), s("i", {
                        staticClass: "dd-arrow i-Arrow-Down"
                    })]), s("ul", {
                        staticClass: "submenu"
                    }, [s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/contact-list"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-CSV"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Contact Lists")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/contact-grid"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-CSV"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Contact Grid")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/contact-details"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-CSV"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Contact Details")])])], 1)])]), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/products"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Ecommerce "), s("span", {
                        staticClass: " ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/taskManager"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Task Manager")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/todo-list"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Todo App "), s("span", {
                        staticClass: " ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/contact-list-table"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Contacts Table "), s("span", {
                        staticClass: " ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/calendar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Calendar-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Calendar")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/inbox"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Email"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Inbox")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/chat"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Speach-Bubble-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Chat")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/apps/scrumboard"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-File"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("scrumboard "), s("span", {
                        staticClass: " ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "extrakits" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "extrakits"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/dropdown"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Arrow-Down"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Dropdown")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/imageCropper"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Crop-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Image Cropper")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/loaders"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Loading-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Loaders")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/sidebar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Two-Windows"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Sidebar")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/spinners"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Two-Windows"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Overlay")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/vueDraggable"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Two-Windows"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Vue Draggable")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/avatar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Two-Windows"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Avatar")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/calendar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Calendar"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Calendar")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/rating"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Circular-Point"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Rating")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/spinButton"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Circular-Point"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Spinbutton")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/datePicker"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Time-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Datepicker")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/timePicker"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Over-Time"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("TimePicker")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/vueTree"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Up---Down-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Vue Tree")]), s("span", {
                        staticClass: "ml-2 badge badge-pill badge-danger"
                    }, [a._v("New")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/toasts"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Bell"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Toastr")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/sweetAlerts"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Approved-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Sweet Alerts")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/extraKits/tour"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Plane"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("User Tour")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "ui-kits" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "ui-kits"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/alerts"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Bell1"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Alerts")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/accordion"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Split-Horizontal-2-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Accordion")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/badges"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Medal-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Badges")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/buttons"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Cursor-Click"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Buttons")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/cards"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Cards")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/carousel"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Video-Photographer"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Carousels")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/list"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Belt-3"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Lists")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/pagination"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Arrow-Next"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Paginations")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/popover"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Speach-Bubble-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Popover")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/progressbar"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Loading"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Progressbar")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/bootstrap-tab"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-New-Tab"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Tabs")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/modals"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Duplicate-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Modals")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/collapsible"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Width-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Collapsible")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/ui-kits/typography"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Width-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Typography")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "charts" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "charts"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/eChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Echart")])])], 1), s("li", {
                        staticClass: "nav-item dropdown-sidemenu",
                        on: {
                            click: function(t) {
                                return t.preventDefault(), a.toggleSidebarDropdwon(t)
                            }
                        }
                    }, [s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Apex Charts")]), s("i", {
                        staticClass: "dd-arrow i-Arrow-Down"
                    })]), s("ul", {
                        staticClass: "submenu"
                    }, [s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexAreaChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Area Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexBarChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Bar Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexLineChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Line Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexMixChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Mix Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexColumnChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Column Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexPieDonutsChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Pie Donut Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexRadarChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Radar Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexRadialBarChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Radial Bar Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexScatterChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Scatter Chart")])])], 1), s("li", [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexSparklineChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Sparkline Chart")])]), s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/charts/apexAreaChart"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Line-Chart-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Apex Area Chart")])])], 1)])])]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "widgets" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "widgets"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/widgets/widgetCard"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Two-Windows"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Widget Card")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/widgets/widgetStatistics"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Windows-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Widget Statistics")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/widgets/weatherApp"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Windows-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Weather App")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/widgets/widgetApp"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Windows-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("App Widgets")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/widgets/widgetList"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Windows-2"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Widget List")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "sessions" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "sessions"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/sessions/signIn"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Checked-User"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Sign in")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/sessions/signUp"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Add-User"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Sign up")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/sessions/forgot"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Find-User"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Forgot")])])], 1)]), s("ul", {
                        staticClass: "childNav d-none",
                        class: {
                            "d-block": "pages" == a.selectedParentMenu
                        },
                        attrs: {
                            "data-parent": "others"
                        }
                    }, [s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/error"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Error-404-Window"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("Not Found")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/profile"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Male"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("User Profile")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/icons"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Male"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v("icons")])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/search-result"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-File-Search"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(" Search Result "), s("span", {
                        staticClass: "badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/pricing-table"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Billing"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(" Pricing Table "), s("span", {
                        staticClass: "badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1), s("li", {
                        staticClass: "nav-item"
                    }, [s("router-link", {
                        attrs: {
                            tag: "a",
                            to: "/app/pages/faq"
                        }
                    }, [s("i", {
                        staticClass: "nav-icon i-Billing"
                    }), s("span", {
                        staticClass: "item-name"
                    }, [a._v(" Faq "), s("span", {
                        staticClass: "badge badge-pill badge-danger"
                    }, [a._v("New")])])])], 1)])])]), s("div", {
                        staticClass: "sidebar-overlay",
                        class: {
                            open: a.getSideBarToggleProperties.isSecondarySideNavOpen
                        },
                        on: {
                            click: function(t) {
                                return a.removeOverlay()
                            }
                        }
                    })], 1)
                },
                r = [],
                o = (s("4de4"), s("4160"), s("ac1f"), s("1276"), s("159b"), function() {
                    var a = this,
                        t = a.$createElement,
                        i = a._self._c || t;
                    return i("div", {
                        staticClass: "main-header"
                    }, [a._m(0), i("div", {
                        staticClass: "menu-toggle",
                        on: {
                            click: a.sideBarToggle
                        }
                    }, [i("div"), i("div"), i("div")]), i("div", {
                        staticClass: "d-flex align-items-center"
                    }, [i("div", {
                        directives: [{
                            name: "on-clickaway",
                            rawName: "v-on-clickaway",
                            value: a.closeMegaMenu,
                            expression: "closeMegaMenu"
                        }],
                        staticClass: "dropdown mega-menu d-none d-md-block",
                        class: {
                            show: a.isMegaMenuOpen
                        }
                    }, [i("a", {
                        staticClass: "btn text-muted dropdown-toggle mr-3",
                        attrs: {
                            href: "#",
                            id: "dropdownMegaMenuButton",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "false"
                        },
                        on: {
                            click: a.toggleMegaMenu
                        }
                    }, [a._v("Mega Menu")]), i("div", {
                        staticClass: "dropdown-menu text-left",
                        class: {
                            show: a.isMegaMenuOpen
                        },
                        attrs: {
                            "aria-labelledby": "dropdownMenuButton"
                        }
                    }, [a._m(1)])]), i("div", {
                        staticClass: "search-bar",
                        on: {
                            click: a.toggleSearch
                        }
                    }, [i("input", {
                        attrs: {
                            type: "text",
                            placeholder: "Search"
                        }
                    }), i("i", {
                        staticClass: "search-icon text-muted i-Magnifi-Glass1"
                    })])]), i("div", {
                        staticStyle: {
                            margin: "auto"
                        }
                    }), i("div", {
                        staticClass: "header-part-right"
                    }, [i("i", {
                        staticClass: "i-Full-Screen header-icon d-none d-sm-inline-block",
                        on: {
                            click: a.handleFullScreen
                        }
                    }), i("div", {
                        staticClass: "dropdown"
                    }, [i("b-dropdown", {
                        staticClass: "m-md-2",
                        attrs: {
                            id: "dropdown",
                            text: "Dropdown Button",
                            "toggle-class": "text-decoration-none",
                            "no-caret": "",
                            variant: "link"
                        }
                    }, [i("template", {
                        slot: "button-content"
                    }, [i("i", {
                        staticClass: "i-Safe-Box text-muted header-icon",
                        attrs: {
                            role: "button",
                            id: "dropdownMenuButton",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "false"
                        }
                    })]), i("div", {
                        staticClass: "menu-icon-grid"
                    }, [i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-Shop-4"
                    }), a._v(" Home ")]), i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-Library"
                    }), a._v(" UI Kits ")]), i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-Drop"
                    }), a._v(" Apps ")]), i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-File-Clipboard-File--Text"
                    }), a._v(" Forms ")]), i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-Checked-User"
                    }), a._v(" Sessions ")]), i("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [i("i", {
                        staticClass: "i-Ambulance"
                    }), a._v(" Support ")])])], 2)], 1), i("div", {
                        staticClass: "dropdown"
                    }, [i("b-dropdown", {
                        staticClass: "m-md-2  badge-top-container",
                        attrs: {
                            id: "dropdown-1",
                            text: "Dropdown Button",
                            "toggle-class": "text-decoration-none",
                            "no-caret": "",
                            variant: "link"
                        }
                    }, [i("template", {
                        slot: "button-content"
                    }, [i("span", {
                        staticClass: "badge badge-primary"
                    }, [a._v("3")]), i("i", {
                        staticClass: "i-Bell text-muted header-icon"
                    })]), i("vue-perfect-scrollbar", {
                        ref: "myData",
                        staticClass: "dropdown-menu-right rtl-ps-none notification-dropdown  ps scroll",
                        class: {
                            open: a.getSideBarToggleProperties.isSideNavOpen
                        },
                        attrs: {
                            settings: {
                                suppressScrollX: !0,
                                wheelPropagation: !1
                            }
                        }
                    }, [i("div", {
                        staticClass: "dropdown-item d-flex"
                    }, [i("div", {
                        staticClass: "notification-icon"
                    }, [i("i", {
                        staticClass: "i-Speach-Bubble-6 text-primary mr-1"
                    })]), i("div", {
                        staticClass: "notification-details flex-grow-1"
                    }, [i("p", {
                        staticClass: "m-0 d-flex align-items-center"
                    }, [i("span", [a._v("New message")]), i("span", {
                        staticClass: "flex-grow-1"
                    }), i("span", {
                        staticClass: "text-small text-muted ml-auto"
                    }, [a._v("10 sec ago")])]), i("p", {
                        staticClass: "text-small text-muted m-0"
                    }, [a._v(" James: Hey! are you busy? ")])])]), i("div", {
                        staticClass: "dropdown-item d-flex"
                    }, [i("div", {
                        staticClass: "notification-icon"
                    }, [i("i", {
                        staticClass: "i-Receipt-3 text-success mr-1"
                    })]), i("div", {
                        staticClass: "notification-details flex-grow-1"
                    }, [i("p", {
                        staticClass: "m-0 d-flex align-items-center"
                    }, [i("span", [a._v("New order received")]), i("span", {
                        staticClass: "flex-grow-1"
                    }), i("span", {
                        staticClass: "text-small text-muted ml-auto"
                    }, [a._v("2 hours ago")])]), i("p", {
                        staticClass: "text-small text-muted m-0"
                    }, [a._v("1 Headphone, 3 iPhone x")])])]), i("div", {
                        staticClass: "dropdown-item d-flex"
                    }, [i("div", {
                        staticClass: "notification-icon"
                    }, [i("i", {
                        staticClass: "i-Empty-Box text-danger mr-1"
                    })]), i("div", {
                        staticClass: "notification-details flex-grow-1"
                    }, [i("p", {
                        staticClass: "m-0 d-flex align-items-center"
                    }, [i("span", [a._v("Product out of stock")]), i("span", {
                        staticClass: "flex-grow-1"
                    }), i("span", {
                        staticClass: "text-small text-muted ml-auto"
                    }, [a._v("10 hours ago")])]), i("p", {
                        staticClass: "text-small text-muted m-0"
                    }, [a._v(" Headphone E67, R98, XL90, Q77 ")])])]), i("div", {
                        staticClass: "dropdown-item d-flex"
                    }, [i("div", {
                        staticClass: "notification-icon"
                    }, [i("i", {
                        staticClass: "i-Data-Power text-success mr-1"
                    })]), i("div", {
                        staticClass: "notification-details flex-grow-1"
                    }, [i("p", {
                        staticClass: "m-0 d-flex align-items-center"
                    }, [i("span", [a._v("Server Up!")]), i("span", {
                        staticClass: "flex-grow-1"
                    }), i("span", {
                        staticClass: "text-small text-muted ml-auto"
                    }, [a._v("14 hours ago")])]), i("p", {
                        staticClass: "text-small text-muted m-0"
                    }, [a._v(" Server rebooted successfully ")])])])])], 2)], 1), i("div", {
                        staticClass: "dropdown"
                    }, [i("b-dropdown", {
                        staticClass: "m-md-2 user col align-self-end",
                        attrs: {
                            id: "dropdown-1",
                            text: "Dropdown Button",
                            "toggle-class": "text-decoration-none",
                            "no-caret": "",
                            variant: "link"
                        }
                    }, [i("template", {
                        slot: "button-content"
                    }, [i("img", {
                        attrs: {
                            src: s("6f92"),
                            id: "userDropdown",
                            alt: "",
                            "data-toggle": "dropdown",
                            "aria-haspopup": "true",
                            "aria-expanded": "false"
                        }
                    })]), i("div", {
                        staticClass: "dropdown-menu-right",
                        attrs: {
                            "aria-labelledby": "userDropdown"
                        }
                    }, [i("div", {
                        staticClass: "dropdown-header"
                    }, [i("i", {
                        staticClass: "i-Lock-User mr-1"
                    }), a._v(" Timothy Carlson ")]), i("a", {
                        staticClass: "dropdown-item"
                    }, [a._v("Account settings")]), i("a", {
                        staticClass: "dropdown-item"
                    }, [a._v("Billing history")]), i("a", {
                        staticClass: "dropdown-item",
                        attrs: {
                            href: "#"
                        },
                        on: {
                            click: function(t) {
                                return t.preventDefault(), a.logoutUser(t)
                            }
                        }
                    }, [a._v("Sign out")])])], 2)], 1)]), i("search-component", {
                        attrs: {
                            isSearchOpen: a.isSearchOpen
                        },
                        on: {
                            "update:isSearchOpen": function(t) {
                                a.isSearchOpen = t
                            },
                            "update:is-search-open": function(t) {
                                a.isSearchOpen = t
                            },
                            closeSearch: a.toggleSearch
                        }
                    })], 1)
                }),
                c = [function() {
                    var a = this,
                        t = a.$createElement,
                        i = a._self._c || t;
                    return i("div", {
                        staticClass: "logo"
                    }, [i("img", {
                        attrs: {
                            src: s("9d64"),
                            alt: ""
                        }
                    })])
                }, function() {
                    var a = this,
                        t = a.$createElement,
                        s = a._self._c || t;
                    return s("div", {
                        staticClass: "row m-0"
                    }, [s("div", {
                        staticClass: "col-md-4 p-4 text-left bg-img"
                    }, [s("h2", {
                        staticClass: "title"
                    }, [a._v(" Mega Menu "), s("br"), a._v("Sidebar ")]), s("p", [a._v(" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores natus laboriosam fugit, consequatur. ")]), s("p", {
                        staticClass: " mb-30"
                    }, [a._v(" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem odio amet eos dolore suscipit placeat. ")]), s("button", {
                        staticClass: "btn btn-lg btn-rounded btn-outline-warning"
                    }, [a._v(" Learn More ")])]), s("div", {
                        staticClass: "col-md-4 p-4 text-left"
                    }, [s("p", {
                        staticClass: "text-primary text--cap border-bottom-primary d-inline-block"
                    }, [a._v(" Features ")]), s("div", {
                        staticClass: "menu-icon-grid w-auto p-0"
                    }, [s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-Shop-4"
                    }), a._v(" Home ")]), s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-Library"
                    }), a._v(" UI Kits ")]), s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-Drop"
                    }), a._v(" Apps ")]), s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-File-Clipboard-File--Text"
                    }), a._v(" Forms ")]), s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-Checked-User"
                    }), a._v(" Sessions ")]), s("a", {
                        attrs: {
                            href: "#"
                        }
                    }, [s("i", {
                        staticClass: "i-Ambulance"
                    }), a._v(" Support ")])])]), s("div", {
                        staticClass: "col-md-4 p-4 text-left"
                    }, [s("p", {
                        staticClass: "text-primary text--cap border-bottom-primary d-inline-block"
                    }, [a._v(" Components ")]), s("ul", {
                        staticClass: "links"
                    }, [s("li", [s("a", {
                        attrs: {
                            href: "accordion.html"
                        }
                    }, [a._v("Accordion")])]), s("li", [s("a", {
                        attrs: {
                            href: "alerts.html"
                        }
                    }, [a._v("Alerts")])]), s("li", [s("a", {
                        attrs: {
                            href: "buttons.html"
                        }
                    }, [a._v("Buttons")])]), s("li", [s("a", {
                        attrs: {
                            href: "badges.html"
                        }
                    }, [a._v("Badges")])]), s("li", [s("a", {
                        attrs: {
                            href: "carousel.html"
                        }
                    }, [a._v("Carousels")])]), s("li", [s("a", {
                        attrs: {
                            href: "lists.html"
                        }
                    }, [a._v("Lists")])]), s("li", [s("a", {
                        attrs: {
                            href: "popover.html"
                        }
                    }, [a._v("Popover")])]), s("li", [s("a", {
                        attrs: {
                            href: "tables.html"
                        }
                    }, [a._v("Tables")])]), s("li", [s("a", {
                        attrs: {
                            href: "datatables.html"
                        }
                    }, [a._v("Datatables")])]), s("li", [s("a", {
                        attrs: {
                            href: "modals.html"
                        }
                    }, [a._v("Modals")])]), s("li", [s("a", {
                        attrs: {
                            href: "nouislider.html"
                        }
                    }, [a._v("Sliders")])]), s("li", [s("a", {
                        attrs: {
                            href: "tabs.html"
                        }
                    }, [a._v("Tabs")])])])])])
                }],
                d = s("ed08"),
                p = s("9ea9"),
                v = s("9029"),
                m = s("2f62"),
                C = s("c7db"),
                u = {
                    mixins: [C["mixin"]],
                    components: {
                        Sidebar: w,
                        searchComponent: p["a"]
                    },
                    data: function() {
                        return {
                            isDisplay: !0,
                            isStyle: !0,
                            isSearchOpen: !1,
                            isMouseOnMegaMenu: !0,
                            isMegaMenuOpen: !1
                        }
                    },
                    mounted: function() {},
                    computed: Object(n["a"])({}, Object(m["c"])(["getSideBarToggleProperties"])),
                    methods: Object(n["a"])(Object(n["a"])({}, Object(m["b"])(["changeSecondarySidebarProperties", "changeSidebarProperties", "changeThemeMode", "signOut"])), {}, {
                        handleFullScreen: function() {
                            d["a"].toggleFullScreen()
                        },
                        logoutUser: function() {
                            this.signOut(), this.$router.push("/app/sessions/signIn")
                        },
                        closeMegaMenu: function() {
                            this.isMegaMenuOpen = !1
                        },
                        toggleMegaMenu: function() {
                            this.isMegaMenuOpen = !this.isMegaMenuOpen
                        },
                        toggleSearch: function() {
                            this.isSearchOpen = !this.isSearchOpen
                        },
                        sideBarToggle: function(a) {
                            this.getSideBarToggleProperties.isSideNavOpen && this.getSideBarToggleProperties.isSecondarySideNavOpen && v["isMobile"] ? (this.changeSidebarProperties(), this.changeSecondarySidebarProperties()) : this.getSideBarToggleProperties.isSideNavOpen && this.getSideBarToggleProperties.isSecondarySideNavOpen ? this.changeSecondarySidebarProperties() : this.getSideBarToggleProperties.isSideNavOpen ? this.changeSidebarProperties() : this.getSideBarToggleProperties.isSideNavOpen || this.getSideBarToggleProperties.isSecondarySideNavOpen || this.getSideBarToggleProperties.isActiveSecondarySideNav ? this.getSideBarToggleProperties.isSideNavOpen || this.getSideBarToggleProperties.isSecondarySideNavOpen || (this.changeSidebarProperties(), this.changeSecondarySidebarProperties()) : this.changeSidebarProperties()
                        }
                    })
                },
                g = u,
                h = s("2877"),
                b = Object(h["a"])(g, o, c, !1, null, null, null),
                f = b.exports,
                _ = {
                    components: {
                        Topnav: f
                    },
                    data: function() {
                        return {
                            isDisplay: !0,
                            isMenuOver: !1,
                            isStyle: !0,
                            selectedParentMenu: "",
                            isMobile: v["isMobile"]
                        }
                    },
                    mounted: function() {
                        this.toggleSelectedParentMenu(), window.addEventListener("resize", this.handleWindowResize), document.addEventListener("click", this.returnSelectedParentMenu), this.handleWindowResize()
                    },
                    beforeDestroy: function() {
                        document.removeEventListener("click", this.returnSelectedParentMenu), window.removeEventListener("resize", this.handleWindowResize)
                    },
                    computed: Object(n["a"])({}, Object(m["c"])(["getSideBarToggleProperties"])),
                    methods: Object(n["a"])(Object(n["a"])({}, Object(m["b"])(["changeSecondarySidebarProperties", "changeSecondarySidebarPropertiesViaMenuItem", "changeSecondarySidebarPropertiesViaOverlay", "changeSidebarProperties"])), {}, {
                        handleWindowResize: function() {
                            window.innerWidth <= 1200 ? (this.getSideBarToggleProperties.isSideNavOpen && this.changeSidebarProperties(), this.getSideBarToggleProperties.isSecondarySideNavOpen && this.changeSecondarySidebarProperties()) : this.getSideBarToggleProperties.isSideNavOpen || this.changeSidebarProperties()
                        },
                        toggleSelectedParentMenu: function() {
                            var a = this.$route.path.split("/").filter((function(a) {
                                return "" !== a
                            }))[1];
                            this.selectedParentMenu = void 0 !== a || null !== a ? a.toLowerCase() : "dashboards"
                        },
                        toggleSubMenu: function(a) {
                            var t = a.target.dataset.submenu,
                                s = a.target.dataset.item;
                            t ? (this.selectedParentMenu = s, this.changeSecondarySidebarPropertiesViaMenuItem(!0)) : (this.selectedParentMenu = s, this.changeSecondarySidebarPropertiesViaMenuItem(!1))
                        },
                        removeOverlay: function() {
                            this.changeSecondarySidebarPropertiesViaOverlay(), window.innerWidth <= 1200 && this.changeSidebarProperties(), this.toggleSelectedParentMenu()
                        },
                        returnSelectedParentMenu: function() {
                            this.isMenuOver || this.toggleSelectedParentMenu()
                        },
                        toggleSidebarDropdwon: function(a) {
                            var t = this.$el.querySelectorAll(".dropdown-sidemenu.open");
                            a.currentTarget.classList.toggle("open"), t.forEach((function(a) {
                                a.classList.remove("open")
                            }))
                        }
                    })
                },
                S = _,
                k = Object(h["a"])(S, l, r, !1, null, "24bd52de", null),
                w = k.exports,
                x = s("1e5d"),
                M = {
                    components: {
                        Sidebar: w,
                        TopNav: f,
                        appFooter: x["a"]
                    },
                    data: function() {
                        return {}
                    },
                    computed: Object(n["a"])({}, Object(m["c"])(["getSideBarToggleProperties"])),
                    methods: {}
                },
                P = M,
                y = Object(h["a"])(P, i, e, !1, null, null, null);
            t["default"] = y.exports
        }
    }
]);