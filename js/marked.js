/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function (e) {
    "use strict";
    var x = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
        def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
        nptable: g,
        table: g,
        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
        text: /^[^\n]+/
    };
    function a(e) {
        this.tokens = [],
            this.tokens.links = Object.create(null),
            this.options = e || k.defaults,
            this.rules = x.normal,
            this.options.pedantic ? this.rules = x.pedantic : this.options.gfm && (this.rules = x.gfm)
    }
    x._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
        x._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
        x.def = i(x.def).replace("label", x._label).replace("title", x._title).getRegex(),
        x.bullet = /(?:[*+-]|\d{1,9}\.)/,
        x.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,
        x.item = i(x.item, "gm").replace(/bull/g, x.bullet).getRegex(),
        x.list = i(x.list).replace(/bull/g, x.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + x.def.source + ")").getRegex(),
        x._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
        x._comment = /<!--(?!-?>)[\s\S]*?-->/,
        x.html = i(x.html, "i").replace("comment", x._comment).replace("tag", x._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
        x.paragraph = i(x._paragraph).replace("hr", x.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", x._tag).getRegex(),
        x.blockquote = i(x.blockquote).replace("paragraph", x.paragraph).getRegex(),
        x.normal = f({}, x),
        x.gfm = f({}, x.normal, {
            nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
            table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
        }),
        x.pedantic = f({}, x.normal, {
            html: i("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", x._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
            fences: g,
            paragraph: i(x.normal._paragraph).replace("hr", x.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", x.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
        }),
        a.rules = x,
        a.lex = function (e, t) {
            return new a(t).lex(e)
        }
        ,
        a.prototype.lex = function (e) {
            return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"),
                this.token(e, !0)
        }
        ,
        a.prototype.token = function (e, t) {
            var n, r, s, i, l, o, a, h, p, u, c, g, f, d, m, k;
            for (e = e.replace(/^ +$/gm, ""); e;)
                if ((s = this.rules.newline.exec(e)) && (e = e.substring(s[0].length),
                    1 < s[0].length && this.tokens.push({
                        type: "space"
                    })),
                    s = this.rules.code.exec(e)) {
                    var b = this.tokens[this.tokens.length - 1];
                    e = e.substring(s[0].length),
                        b && "paragraph" === b.type ? b.text += "\n" + s[0].trimRight() : (s = s[0].replace(/^ {4}/gm, ""),
                            this.tokens.push({
                                type: "code",
                                codeBlockStyle: "indented",
                                text: this.options.pedantic ? s : w(s, "\n")
                            }))
                } else if (s = this.rules.fences.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "code",
                            lang: s[2] ? s[2].trim() : s[2],
                            text: s[3] || ""
                        });
                else if (s = this.rules.heading.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "heading",
                            depth: s[1].length,
                            text: s[2]
                        });
                else if ((s = this.rules.nptable.exec(e)) && (o = {
                    type: "table",
                    header: y(s[1].replace(/^ *| *\| *$/g, "")),
                    align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: s[3] ? s[3].replace(/\n$/, "").split("\n") : []
                }).header.length === o.align.length) {
                    for (e = e.substring(s[0].length),
                        c = 0; c < o.align.length; c++)
                        /^ *-+: *$/.test(o.align[c]) ? o.align[c] = "right" : /^ *:-+: *$/.test(o.align[c]) ? o.align[c] = "center" : /^ *:-+ *$/.test(o.align[c]) ? o.align[c] = "left" : o.align[c] = null;
                    for (c = 0; c < o.cells.length; c++)
                        o.cells[c] = y(o.cells[c], o.header.length);
                    this.tokens.push(o)
                } else if (s = this.rules.hr.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "hr"
                        });
                else if (s = this.rules.blockquote.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "blockquote_start"
                        }),
                        s = s[0].replace(/^ *> ?/gm, ""),
                        this.token(s, t),
                        this.tokens.push({
                            type: "blockquote_end"
                        });
                else if (s = this.rules.list.exec(e)) {
                    for (e = e.substring(s[0].length),
                        a = {
                            type: "list_start",
                            ordered: d = 1 < (i = s[2]).length,
                            start: d ? +i : "",
                            loose: !1
                        },
                        this.tokens.push(a),
                        n = !(h = []),
                        f = (s = s[0].match(this.rules.item)).length,
                        c = 0; c < f; c++)
                        u = (o = s[c]).length,
                            ~(o = o.replace(/^ *([*+-]|\d+\.) */, "")).indexOf("\n ") && (u -= o.length,
                                o = this.options.pedantic ? o.replace(/^ {1,4}/gm, "") : o.replace(new RegExp("^ {1," + u + "}", "gm"), "")),
                            c !== f - 1 && (l = x.bullet.exec(s[c + 1])[0],
                                (1 < i.length ? 1 === l.length : 1 < l.length || this.options.smartLists && l !== i) && (e = s.slice(c + 1).join("\n") + e,
                                    c = f - 1)),
                            r = n || /\n\n(?!\s*$)/.test(o),
                            c !== f - 1 && (n = "\n" === o.charAt(o.length - 1),
                                r || (r = n)),
                            r && (a.loose = !0),
                            k = void 0,
                            (m = /^\[[ xX]\] /.test(o)) && (k = " " !== o[1],
                                o = o.replace(/^\[[ xX]\] +/, "")),
                            p = {
                                type: "list_item_start",
                                task: m,
                                checked: k,
                                loose: r
                            },
                            h.push(p),
                            this.tokens.push(p),
                            this.token(o, !1),
                            this.tokens.push({
                                type: "list_item_end"
                            });
                    if (a.loose)
                        for (f = h.length,
                            c = 0; c < f; c++)
                            h[c].loose = !0;
                    this.tokens.push({
                        type: "list_end"
                    })
                } else if (s = this.rules.html.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: this.options.sanitize ? "paragraph" : "html",
                            pre: !this.options.sanitizer && ("pre" === s[1] || "script" === s[1] || "style" === s[1]),
                            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(s[0]) : _(s[0]) : s[0]
                        });
                else if (t && (s = this.rules.def.exec(e)))
                    e = e.substring(s[0].length),
                        s[3] && (s[3] = s[3].substring(1, s[3].length - 1)),
                        g = s[1].toLowerCase().replace(/\s+/g, " "),
                        this.tokens.links[g] || (this.tokens.links[g] = {
                            href: s[2],
                            title: s[3]
                        });
                else if ((s = this.rules.table.exec(e)) && (o = {
                    type: "table",
                    header: y(s[1].replace(/^ *| *\| *$/g, "")),
                    align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: s[3] ? s[3].replace(/\n$/, "").split("\n") : []
                }).header.length === o.align.length) {
                    for (e = e.substring(s[0].length),
                        c = 0; c < o.align.length; c++)
                        /^ *-+: *$/.test(o.align[c]) ? o.align[c] = "right" : /^ *:-+: *$/.test(o.align[c]) ? o.align[c] = "center" : /^ *:-+ *$/.test(o.align[c]) ? o.align[c] = "left" : o.align[c] = null;
                    for (c = 0; c < o.cells.length; c++)
                        o.cells[c] = y(o.cells[c].replace(/^ *\| *| *\| *$/g, ""), o.header.length);
                    this.tokens.push(o)
                } else if (s = this.rules.lheading.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "heading",
                            depth: "=" === s[2].charAt(0) ? 1 : 2,
                            text: s[1]
                        });
                else if (t && (s = this.rules.paragraph.exec(e)))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "paragraph",
                            text: "\n" === s[1].charAt(s[1].length - 1) ? s[1].slice(0, -1) : s[1]
                        });
                else if (s = this.rules.text.exec(e))
                    e = e.substring(s[0].length),
                        this.tokens.push({
                            type: "text",
                            text: s[0]
                        });
                else if (e)
                    throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
            return this.tokens
        }
        ;
    var n = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: g,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
        em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: g,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
    };
    function p(e, t) {
        if (this.options = t || k.defaults,
            this.links = e,
            this.rules = n.normal,
            this.renderer = this.options.renderer || new r,
            this.renderer.options = this.options,
            !this.links)
            throw new Error("Tokens array requires a `links` property.");
        this.options.pedantic ? this.rules = n.pedantic : this.options.gfm && (this.options.breaks ? this.rules = n.breaks : this.rules = n.gfm)
    }
    function r(e) {
        this.options = e || k.defaults
    }
    function s() { }
    function h(e) {
        this.tokens = [],
            this.token = null,
            this.options = e || k.defaults,
            this.options.renderer = this.options.renderer || new r,
            this.renderer = this.options.renderer,
            this.renderer.options = this.options,
            this.slugger = new t
    }
    function t() {
        this.seen = {}
    }
    function _(e, t) {
        if (t) {
            if (_.escapeTest.test(e))
                return e.replace(_.escapeReplace, function (e) {
                    return _.replacements[e]
                })
        } else if (_.escapeTestNoEncode.test(e))
            return e.replace(_.escapeReplaceNoEncode, function (e) {
                return _.replacements[e]
            });
        return e
    }
    function c(e) {
        return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function (e, t) {
            return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
        })
    }
    function i(n, e) {
        return n = n.source || n,
            e = e || "",
        {
            replace: function (e, t) {
                return t = (t = t.source || t).replace(/(^|[^\[])\^/g, "$1"),
                    n = n.replace(e, t),
                    this
            },
            getRegex: function () {
                return new RegExp(n, e)
            }
        }
    }
    function l(e, t, n) {
        if (e) {
            try {
                var r = decodeURIComponent(c(n)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
                return null
            }
            if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:"))
                return null
        }
        t && !u.test(n) && (n = function (e, t) {
            o[" " + e] || (/^[^:]+:\/*[^/]*$/.test(e) ? o[" " + e] = e + "/" : o[" " + e] = w(e, "/", !0));
            return e = o[" " + e],
                "//" === t.slice(0, 2) ? e.replace(/:[\s\S]*/, ":") + t : "/" === t.charAt(0) ? e.replace(/(:\/*[^/]*)[\s\S]*/, "$1") + t : e + t
        }(t, n));
        try {
            n = encodeURI(n).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return n
    }
    n._punctuation = "!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~",
        n.em = i(n.em).replace(/punctuation/g, n._punctuation).getRegex(),
        n._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,
        n._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,
        n._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
        n.autolink = i(n.autolink).replace("scheme", n._scheme).replace("email", n._email).getRegex(),
        n._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
        n.tag = i(n.tag).replace("comment", x._comment).replace("attribute", n._attribute).getRegex(),
        n._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
        n._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,
        n._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
        n.link = i(n.link).replace("label", n._label).replace("href", n._href).replace("title", n._title).getRegex(),
        n.reflink = i(n.reflink).replace("label", n._label).getRegex(),
        n.normal = f({}, n),
        n.pedantic = f({}, n.normal, {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
            link: i(/^!?\[(label)\]\((.*?)\)/).replace("label", n._label).getRegex(),
            reflink: i(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", n._label).getRegex()
        }),
        n.gfm = f({}, n.normal, {
            escape: i(n.escape).replace("])", "~|])").getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^~+(?=\S)([\s\S]*?\S)~+/,
            text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
        }),
        n.gfm.url = i(n.gfm.url, "i").replace("email", n.gfm._extended_email).getRegex(),
        n.breaks = f({}, n.gfm, {
            br: i(n.br).replace("{2,}", "*").getRegex(),
            text: i(n.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
        }),
        p.rules = n,
        p.output = function (e, t, n) {
            return new p(t, n).output(e)
        }
        ,
        p.prototype.output = function (e) {
            for (var t, n, r, s, i, l, o = ""; e;)
                if (i = this.rules.escape.exec(e))
                    e = e.substring(i[0].length),
                        o += _(i[1]);
                else if (i = this.rules.tag.exec(e))
                    !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1),
                        !this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(i[0]) ? this.inRawBlock = !0 : this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(i[0]) && (this.inRawBlock = !1),
                        e = e.substring(i[0].length),
                        o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : _(i[0]) : i[0];
                else if (i = this.rules.link.exec(e)) {
                    var a = d(i[2], "()");
                    if (-1 < a) {
                        var h = 4 + i[1].length + a;
                        i[2] = i[2].substring(0, a),
                            i[0] = i[0].substring(0, h).trim(),
                            i[3] = ""
                    }
                    e = e.substring(i[0].length),
                        this.inLink = !0,
                        r = i[2],
                        s = this.options.pedantic ? (t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r)) ? (r = t[1],
                            t[3]) : "" : i[3] ? i[3].slice(1, -1) : "",
                        r = r.trim().replace(/^<([\s\S]*)>$/, "$1"),
                        o += this.outputLink(i, {
                            href: p.escapes(r),
                            title: p.escapes(s)
                        }),
                        this.inLink = !1
                } else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
                    if (e = e.substring(i[0].length),
                        t = (i[2] || i[1]).replace(/\s+/g, " "),
                        !(t = this.links[t.toLowerCase()]) || !t.href) {
                        o += i[0].charAt(0),
                            e = i[0].substring(1) + e;
                        continue
                    }
                    this.inLink = !0,
                        o += this.outputLink(i, t),
                        this.inLink = !1
                } else if (i = this.rules.strong.exec(e))
                    e = e.substring(i[0].length),
                        o += this.renderer.strong(this.output(i[4] || i[3] || i[2] || i[1]));
                else if (i = this.rules.em.exec(e))
                    e = e.substring(i[0].length),
                        o += this.renderer.em(this.output(i[6] || i[5] || i[4] || i[3] || i[2] || i[1]));
                else if (i = this.rules.code.exec(e))
                    e = e.substring(i[0].length),
                        o += this.renderer.codespan(_(i[2].trim(), !0));
                else if (i = this.rules.br.exec(e))
                    e = e.substring(i[0].length),
                        o += this.renderer.br();
                else if (i = this.rules.del.exec(e))
                    e = e.substring(i[0].length),
                        o += this.renderer.del(this.output(i[1]));
                else if (i = this.rules.autolink.exec(e))
                    e = e.substring(i[0].length),
                        r = "@" === i[2] ? "mailto:" + (n = _(this.mangle(i[1]))) : n = _(i[1]),
                        o += this.renderer.link(r, null, n);
                else if (this.inLink || !(i = this.rules.url.exec(e))) {
                    if (i = this.rules.text.exec(e))
                        e = e.substring(i[0].length),
                            this.inRawBlock ? o += this.renderer.text(this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : _(i[0]) : i[0]) : o += this.renderer.text(_(this.smartypants(i[0])));
                    else if (e)
                        throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
                } else {
                    if ("@" === i[2])
                        r = "mailto:" + (n = _(i[0]));
                    else {
                        for (; l = i[0],
                            i[0] = this.rules._backpedal.exec(i[0])[0],
                            l !== i[0];)
                            ;
                        n = _(i[0]),
                            r = "www." === i[1] ? "http://" + n : n
                    }
                    e = e.substring(i[0].length),
                        o += this.renderer.link(r, null, n)
                }
            return o
        }
        ,
        p.escapes = function (e) {
            return e ? e.replace(p.rules._escapes, "$1") : e
        }
        ,
        p.prototype.outputLink = function (e, t) {
            var n = t.href
                , r = t.title ? _(t.title) : null;
            return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, _(e[1]))
        }
        ,
        p.prototype.smartypants = function (e) {
            return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
        }
        ,
        p.prototype.mangle = function (e) {
            if (!this.options.mangle)
                return e;
            for (var t, n = "", r = e.length, s = 0; s < r; s++)
                t = e.charCodeAt(s),
                    .5 < Math.random() && (t = "x" + t.toString(16)),
                    n += "&#" + t + ";";
            return n
        }
        ,
        r.prototype.code = function (e, t, n) {
            var r = (t || "").match(/\S*/)[0];
            if (this.options.highlight) {
                var s = this.options.highlight(e, r);
                null != s && s !== e && (n = !0,
                    e = s)
            }
            return r ? '<pre><code class="' + this.options.langPrefix + _(r, !0) + '">' + (n ? e : _(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : _(e, !0)) + "</code></pre>"
        }
        ,
        r.prototype.blockquote = function (e) {
            return "<blockquote>\n" + e + "</blockquote>\n"
        }
        ,
        r.prototype.html = function (e) {
            return e
        }
        ,
        r.prototype.heading = function (e, t, n, r) {
            //return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + r.slug(n) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"

            //見出しにid値が設定されないように修正
            //return this.options.headerIds ? "<h" + t + '>' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"

            //パーツページの見出しにクラス名(.parts-style)を設定
            return this.options.headerIds ? "<h" + t + ' class="heading1"' + ' id="' + this.options.headerPrefix + r.slug(n) + '" >' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"

        }
        ,
        r.prototype.hr = function () {
            //return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
            return this.options.xhtml ? '<hr class="parts-hr"/>\n' : '<hr class="parts-hr">\n'
        }
        ,
        r.prototype.list = function (e, t, n) {
            var r = t ? 'ol class="parts-list"' : 'ul class="parts-list"';
            return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n"
        }
        ,
        r.prototype.listitem = function (e) {
            return "<li>" + e + "</li>\n"
        }
        ,
        r.prototype.checkbox = function (e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        }
        ,
        r.prototype.paragraph = function (e) {
            return "<p>" + e + "</p>\n"
        }
        ,
        r.prototype.table = function (e, t) {
            return t && (t = "<tbody>" + t + "</tbody>"),
                "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        }
        ,
        r.prototype.tablerow = function (e) {
            return "<tr>\n" + e + "</tr>\n"
        }
        ,
        r.prototype.tablecell = function (e, t) {
            var n = t.header ? "th" : "td";
            return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n"
        }
        ,
        r.prototype.strong = function (e) {
            return "<strong>" + e + "</strong>"
        }
        ,
        r.prototype.em = function (e) {
            return "<em>" + e + "</em>"
        }
        ,
        r.prototype.codespan = function (e) {
            return "<code>" + e + "</code>"
        }
        ,
        r.prototype.br = function () {
            return this.options.xhtml ? "<br/>" : "<br>"
        }
        ,
        r.prototype.del = function (e) {
            return "<del>" + e + "</del>"
        }
        ,
        r.prototype.link = function (e, t, n) {
            if (null === (e = l(this.options.sanitize, this.options.baseUrl, e)))
                return n;
            var r = '<a href="' + _(e) + '"';
            return t && (r += ' title="' + t + '"'),
                r += ">" + n + "</a>"
        }
        ,
        r.prototype.image = function (e, t, n) {
            if (null === (e = l(this.options.sanitize, this.options.baseUrl, e)))
                return n;
            var r = '<img src="' + e + '" alt="' + n + '"';
            return t && (r += ' title="' + t + '"'),
                r += this.options.xhtml ? "/>" : ">"
        }
        ,
        r.prototype.text = function (e) {
            return e
        }
        ,
        s.prototype.strong = s.prototype.em = s.prototype.codespan = s.prototype.del = s.prototype.text = function (e) {
            return e
        }
        ,
        s.prototype.link = s.prototype.image = function (e, t, n) {
            return "" + n
        }
        ,
        s.prototype.br = function () {
            return ""
        }
        ,
        h.parse = function (e, t) {
            return new h(t).parse(e)
        }
        ,
        h.prototype.parse = function (e) {
            this.inline = new p(e.links, this.options),
                this.inlineText = new p(e.links, f({}, this.options, {
                    renderer: new s
                })),
                this.tokens = e.reverse();
            for (var t = ""; this.next();)
                t += this.tok();
            return t
        }
        ,
        h.prototype.next = function () {
            return this.token = this.tokens.pop(),
                this.token
        }
        ,
        h.prototype.peek = function () {
            return this.tokens[this.tokens.length - 1] || 0
        }
        ,
        h.prototype.parseText = function () {
            for (var e = this.token.text; "text" === this.peek().type;)
                e += "\n" + this.next().text;
            return this.inline.output(e)
        }
        ,
        h.prototype.tok = function () {
            switch (this.token.type) {
                case "space":
                    return "";
                case "hr":
                    return this.renderer.hr();
                case "heading":
                    return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, c(this.inlineText.output(this.token.text)), this.slugger);
                case "code":
                    return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
                case "table":
                    var e, t, n, r, s = "", i = "";
                    for (n = "",
                        e = 0; e < this.token.header.length; e++)
                        n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                            header: !0,
                            align: this.token.align[e]
                        });
                    for (s += this.renderer.tablerow(n),
                        e = 0; e < this.token.cells.length; e++) {
                        for (t = this.token.cells[e],
                            n = "",
                            r = 0; r < t.length; r++)
                            n += this.renderer.tablecell(this.inline.output(t[r]), {
                                header: !1,
                                align: this.token.align[r]
                            });
                        i += this.renderer.tablerow(n)
                    }
                    return this.renderer.table(s, i);
                case "blockquote_start":
                    for (i = ""; "blockquote_end" !== this.next().type;)
                        i += this.tok();
                    return this.renderer.blockquote(i);
                case "list_start":
                    i = "";
                    for (var l = this.token.ordered, o = this.token.start; "list_end" !== this.next().type;)
                        i += this.tok();
                    return this.renderer.list(i, l, o);
                case "list_item_start":
                    i = "";
                    var a = this.token.loose
                        , h = this.token.checked
                        , p = this.token.task;
                    for (this.token.task && (i += this.renderer.checkbox(h)); "list_item_end" !== this.next().type;)
                        i += a || "text" !== this.token.type ? this.tok() : this.parseText();
                    return this.renderer.listitem(i, p, h);
                case "html":
                    return this.renderer.html(this.token.text);
                case "paragraph":
                    return this.renderer.paragraph(this.inline.output(this.token.text));
                case "text":
                    return this.renderer.paragraph(this.parseText());
                default:
                    var u = 'Token with "' + this.token.type + '" type was not found.';
                    if (!this.options.silent)
                        throw new Error(u);
            }
        }
        ,
        t.prototype.slug = function (e) {
            var t = e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
            if (this.seen.hasOwnProperty(t))
                for (var n = t; this.seen[n]++,
                    t = n + "-" + this.seen[n],
                    this.seen.hasOwnProperty(t);)
                    ;
            return this.seen[t] = 0,
                t
        }
        ,
        _.escapeTest = /[&<>"']/,
        _.escapeReplace = /[&<>"']/g,
        _.replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        _.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/,
        _.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    var o = {}
        , u = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function g() { }
    function f(e) {
        for (var t, n, r = 1; r < arguments.length; r++)
            for (n in t = arguments[r])
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
    }
    function y(e, t) {
        var n = e.replace(/\|/g, function (e, t, n) {
            for (var r = !1, s = t; 0 <= --s && "\\" === n[s];)
                r = !r;
            return r ? "|" : " |"
        }).split(/ \|/)
            , r = 0;
        if (n.length > t)
            n.splice(t);
        else
            for (; n.length < t;)
                n.push("");
        for (; r < n.length; r++)
            n[r] = n[r].trim().replace(/\\\|/g, "|");
        return n
    }
    function w(e, t, n) {
        if (0 === e.length)
            return "";
        for (var r = 0; r < e.length;) {
            var s = e.charAt(e.length - r - 1);
            if (s !== t || n) {
                if (s === t || !n)
                    break;
                r++
            } else
                r++
        }
        return e.substr(0, e.length - r)
    }
    function d(e, t) {
        if (-1 === e.indexOf(t[1]))
            return -1;
        for (var n = 0, r = 0; r < e.length; r++)
            if ("\\" === e[r])
                r++;
            else if (e[r] === t[0])
                n++;
            else if (e[r] === t[1] && --n < 0)
                return r;
        return -1
    }
    function m(e) {
        e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
    }
    function k(e, n, r) {
        if (null == e)
            throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e)
            throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if (r || "function" == typeof n) {
            r || (r = n,
                n = null),
                m(n = f({}, k.defaults, n || {}));
            var s, i, l = n.highlight, t = 0;
            try {
                s = a.lex(e, n)
            } catch (e) {
                return r(e)
            }
            i = s.length;
            var o = function (t) {
                if (t)
                    return n.highlight = l,
                        r(t);
                var e;
                try {
                    e = h.parse(s, n)
                } catch (e) {
                    t = e
                }
                return n.highlight = l,
                    t ? r(t) : r(null, e)
            };
            if (!l || l.length < 3)
                return o();
            if (delete n.highlight,
                !i)
                return o();
            for (; t < s.length; t++)
                !function (n) {
                    "code" !== n.type ? --i || o() : l(n.text, n.lang, function (e, t) {
                        return e ? o(e) : null == t || t === n.text ? --i || o() : (n.text = t,
                            n.escaped = !0,
                            void (--i || o()))
                    })
                }(s[t])
        } else
            try {
                return n && (n = f({}, k.defaults, n)),
                    m(n),
                    h.parse(a.lex(e, n), n)
            } catch (e) {
                if (e.message += "\nPlease report this to https://github.com/markedjs/marked.",
                    (n || k.defaults).silent)
                    return "<p>An error occurred:</p><pre>" + _(e.message + "", !0) + "</pre>";
                throw e
            }
    }
    g.exec = g,
        k.options = k.setOptions = function (e) {
            return f(k.defaults, e),
                k
        }
        ,
        k.getDefaults = function () {
            return {
                baseUrl: null,
                breaks: !1,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: new r,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartLists: !1,
                smartypants: !1,
                xhtml: !1
            }
        }
        ,
        k.defaults = k.getDefaults(),
        k.Parser = h,
        k.parser = h.parse,
        k.Renderer = r,
        k.TextRenderer = s,
        k.Lexer = a,
        k.lexer = a.lex,
        k.InlineLexer = p,
        k.inlineLexer = p.output,
        k.Slugger = t,
        k.parse = k,
        "undefined" != typeof module && "object" == typeof exports ? module.exports = k : "function" == typeof define && define.amd ? define(function () {
            return k
        }) : e.marked = k
}(this || ("undefined" != typeof window ? window : global));

