---
---
document.addEventListener 'DOMContentLoaded', ->

  nav = document.querySelector 'nav'
  ref = document.querySelectorAll 'h2, h3, h4, h5, h6, article + hr'

  list = document.createElement 'ul'

  append = (el) ->
    li = document.createElement 'li'
    li.appendChild el
    list.appendChild li

  [ref...].forEach (ref) ->
    if ref.tagName is 'HR'
      return append document.createElement 'hr'

    text = ref.innerHTML

    waypoint = document.createElement 'a'
    waypoint.id = text.toLowerCase().replace('\'', '').replace /[\W]+/g, '-'

    location = ref.previousElementSibling
    if location.tagName isnt 'TIME'
      location = ref
    ref.parentNode.insertBefore waypoint, location

    link = document.createElement 'a'
    link.href = "##{waypoint.id}"
    link.innerHTML = text

    append link

  nav.insertBefore list, nav.firstChild
