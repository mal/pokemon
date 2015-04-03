---
---
document.addEventListener 'DOMContentLoaded', ->

  nav = document.querySelector 'nav'
  ref = document.querySelectorAll 'h2, h3, h4, h5, h6, article + hr'

  list = document.createElement 'ul'

  item = (el) ->
    li = document.createElement 'li'
    li.appendChild el
    li

  [ref...].forEach (ref) ->
    return list.appendChild item document.createElement 'hr' if ref.tagName is 'HR'

    text = ref.innerHTML
    ref.id = text.toLowerCase().replace('\'', '').replace /[\W]+/g, '-'

    link = document.createElement 'a'
    link.href = "##{ref.id}"
    link.innerHTML = text

    list.appendChild item link

  nav.insertBefore list, nav.firstChild
