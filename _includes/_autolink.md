{% assign currentYear = 'now'|date: '%Y' %}
{% assign site.experience.experience = currentYear | minus: site.experience.sinceYear %}
{% assign experience = site.experience.experience %}

{% include _acronyms.md %}
{% include _links.md %}
