(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-2014a769"], {
        2613: function(t, a, s) {
            t.exports = s.p + "img/photo-long-3.f4e38da9.jpg"
        },
        3763: function(t, a, s) {
            "use strict";
            var i = s("ea49"),
                n = s.n(i);
            n.a
        },
        "4ab7": function(t, a, s) {
            t.exports = s.p + "img/photo-wide-4.2e142cde.jpg"
        },
        "9d64": function(t, a, s) {
            t.exports = s.p + "img/logo.e6608349.png"
        },
        ea49: function(t, a, s) {},
        f6ee: function(t, a, s) {
            "use strict";
            s.r(a);
            var i = function() {
                    var t = this,
                        a = t.$createElement,
                        s = t._self._c || a;
                    return s("div", {
                        staticClass: "auth-layout-wrap",
                        style: {
                            backgroundImage: "url(" + t.bgImage + ")"
                        }
                    }, [s("div", {
                        staticClass: "auth-content"
                    }, [s("div", {
                        staticClass: "card o-hidden"
                    }, [s("div", {
                        staticClass: "row"
                    }, [s("div", {
                        staticClass: "col-md-6"
                    }, [s("div", {
                        staticClass: "p-4"
                    }, [s("div", {
                        staticClass: "auth-logo text-center mb-30"
                    }, [s("img", {
                        attrs: {
                            src: t.logo
                        }
                    })]), s("h1", {
                        staticClass: "mb-3 text-18"
                    }, [t._v("Sign In")]), s("b-form", {
                        on: {
                            submit: function(a) {
                                return a.preventDefault(), t.formSubmit(a)
                            }
                        }
                    }, [s("b-form-group", {
                        staticClass: "text-12",
                        attrs: {
                            label: "Email Address"
                        }
                    }, [s("b-form-input", {
                        staticClass: "form-control-rounded",
                        attrs: {
                            type: "text",
                            email: "",
                            required: ""
                        },
                        model: {
                            value: t.email,
                            callback: function(a) {
                                t.email = a
                            },
                            expression: "email"
                        }
                    })], 1), s("b-form-group", {
                        staticClass: "text-12",
                        attrs: {
                            label: "Password"
                        }
                    }, [s("b-form-input", {
                        staticClass: "form-control-rounded",
                        attrs: {
                            type: "password"
                        },
                        model: {
                            value: t.password,
                            callback: function(a) {
                                t.password = a
                            },
                            expression: "password"
                        }
                    })], 1), s("b-button", {
                        staticClass: "btn-rounded btn-block mt-2",
                        attrs: {
                            type: "submit",
                            tag: "button",
                            variant: "primary mt-2",
                            disabled: t.loading
                        }
                    }, [t._v(" SignIn ")]), t.loading ? t._m(0) : t._e(), s("b-button", {
                        staticClass: "btn-rounded",
                        attrs: {
                            to: "signUp",
                            block: "",
                            variant: "primary mt-2"
                        }
                    }, [t._v("Create an account")])], 1), s("div", {
                        staticClass: "mt-3 text-center"
                    }, [s("router-link", {
                        staticClass: "text-muted",
                        attrs: {
                            to: "forgot",
                            tag: "a"
                        }
                    }, [s("u", [t._v("Forgot Password?")])])], 1)], 1)]), s("b-col", {
                        staticClass: "text-center",
                        staticStyle: {
                            backgroundSize: "cover"
                        },
                        style: {
                            backgroundImage: "url(" + t.signInImage + ")"
                        },
                        attrs: {
                            md: "6"
                        }
                    }, [s("div", {
                        staticClass: "pr-3 auth-right"
                    }, [s("router-link", {
                        staticClass: "btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text",
                        attrs: {
                            to: "signUp",
                            href: "signup.html"
                        }
                    }, [s("i", {
                        staticClass: "i-Mail-with-At-Sign"
                    }), t._v(" Sign up with Email ")]), s("a", {
                        staticClass: "btn btn-rounded btn-outline-primary btn-outline-google btn-block btn-icon-text"
                    }, [s("i", {
                        staticClass: "i-Google-Plus"
                    }), t._v(" Sign up with Google ")]), s("a", {
                        staticClass: "btn btn-rounded btn-outline-primary btn-block btn-icon-text btn-outline-facebook"
                    }, [s("i", {
                        staticClass: "i-Facebook-2"
                    }), t._v(" Sign up with Facebook ")])], 1)])], 1)])])])
                },
                n = [function() {
                    var t = this,
                        a = t.$createElement,
                        s = t._self._c || a;
                    return s("div", {
                        staticClass: "typo__p"
                    }, [s("div", {
                        staticClass: "spinner sm spinner-primary mt-3"
                    })])
                }],
                e = s("5530"),
                o = s("2f62"),
                r = {
                    metaInfo: {
                        title: "SignIn"
                    },
                    data: function() {
                        return {
                            email: "ui-lib@gmail.com",
                            password: "123456",
                            userId: "",
                            bgImage: s("4ab7"),
                            logo: s("9d64"),
                            signInImage: s("2613")
                        }
                    },
                    computed: Object(e["a"])({
                        validation: function() {
                            return this.userId.length > 4 && this.userId.length < 13
                        }
                    }, Object(o["c"])(["loggedInUser", "loading", "error"])),
                    methods: Object(e["a"])(Object(e["a"])({}, Object(o["b"])(["login"])), {}, {
                        formSubmit: function() {
                            this.login({
                                email: this.email,
                                password: this.password
                            })
                        },
                        makeToast: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                                a = arguments.length > 1 ? arguments[1] : void 0;
                            this.$bvToast.toast(a, {
                                title: " ".concat(t || "default"),
                                variant: t,
                                solid: !0
                            })
                        }
                    }),
                    watch: {
                        loggedInUser: function(t) {
                            var a = this;
                            t && t.uid && t.uid.length > 0 && (this.makeToast("success", "Successfully Logged In"), setTimeout((function() {
                                a.$router.push("/")
                            }), 500))
                        },
                        error: function(t) {
                            null != t && this.makeToast("warning", t.message)
                        }
                    }
                },
                l = r,
                c = (s("3763"), s("2877")),
                u = Object(c["a"])(l, i, n, !1, null, null, null);
            a["default"] = u.exports
        }
    }
]);