# Social_Footer

![](https://img.shields.io/badge/Plug--in_Type-Dynamic%20Action-yellow.svg) ![](https://img.shields.io/badge/APEX-19.2-success.svg) ![](https://img.shields.io/badge/APEX-20.1-success.svg) ![](https://img.shields.io/badge/APEX-20.2-success.svg) ![](https://img.shields.io/badge/APEX-21.1-success.svg)


Social Footer for Apex

<img src="https://raw.githubusercontent.com/ashishtheapexian/Social_Footer/master/preview.gif">


# Attributes 

- #LINK_TEXT#
- #LINK_URL#
- #ICON#

# SQL Query Examples

```sql
SELECT '#' LINK_URL, 'Facebook' LINK_TEXT, 'fa-facebook' ICON FROM DUAL
UNION 
SELECT '#' LINK_URL, 'Twitter' LINK_TEXT, 'fa-twitter' ICON FROM DUAL
UNION
SELECT 'https://www.github.com' LINK_URL, 'GITHub' LINK_TEXT, 'fa-github' ICON FROM DUAL
UNION
Select 'https://www.google.com' LINK_URL, 'Google' LINK_TEXT, 'fa-google' ICON FROM DUAL
```

<a href="https://apex.oracle.com/pls/apex/f?p=93690:8:"> Demo</a>

<a href="https://blogs.ontoorsolutions.com/post/social_footer_plugin/">Blog</a>
