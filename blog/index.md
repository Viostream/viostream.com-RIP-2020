---
layout: default
title: Blog
excerpt: "An archive of blog posts sorted by date."
search_omit: true
---

<div class="banner text-center">
    <div class="container-fluid">
    	<div class="container hero-text">
	       <h1 class="main-title t-white m-b-40">Join our team of experts</h1>
	       <p class="hero-subtitle-small t-white">As an innovative and dynamic organisation, Viostream attracts high-calibre talent in the fields of software development, sales and customer success, production and technology support.
	       </p>
	       <p class="hero-subtitle-small t-white">
	       With a fast-growing footprint of clients across the globe, we are always interested to hear from professionals with a background in software development, streaming media, webcasting and online video.</p>
       </div>
    </div>
</div>
<div class="container">
	<div class="row">
		<ul class="post-list">
		{% for post in site.categories.blog %} 
		  <li>
		  	<article>
		  		<a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span>
		  		
		  		</a>
		  		{% if post.excerpt %} 
		  			<p class="excerpt">{{ post.excerpt | remove: '\[ ... \]' | remove: '\( ... \)' | markdownify | strip_html | strip_newlines | escape_once }}</p>
		  			{% endif %}
		  	</article>
		 </li>
		{% endfor %}
		</ul>
	</div>
</div>
