---
title: Contact
date: 2022-10-24

type: landing

sections:
  - block: contact
    content:
      title: Contact
      text: |-
        Please email me here!

      email: gjy1614@jbnu.ac.kr
      phone: 010-4895-8655
      address:
        street: 567 Baekje-daero
        city: Jeonju City Deokjin-gu
        region: Jeollabuk-do
        postcode: "54896"
        country: Republic of Korea
        country_code: ko
      coordinates:
        latitude: "35.8460469"
        longitude: "127.1346038"
      directions: engineering college Building 7
      office_hours:
        - everyday 10:00 - 18:00

      appointment_url: "https://open.kakao.com/o/s1GLezSg"
      #contact_links:
      #  - icon: comments
      #    icon_pack: fas
      #    name: Discuss on Forum
      #    link: 'https://discourse.gohugo.io'

      # Automatically link email and phone or display as text?
      autolink: true

      # Email form provider
      form:
        provider: netlify
        formspree:
          id:
        netlify:
          # Enable CAPTCHA challenge to reduce spam?
          captcha: false
    design:
      columns: "1"

  - block: markdown
    content:
      title:
      subtitle: ""
      text:
    design:
      columns: "1"
      background:
        image:
          filename: ct.jpg
          filters:
            brightness: 1
          parallax: false
          position: center
          size: cover
          text_color_light: true
      spacing:
        padding: ["20px", "0", "20px", "0"]
      css_class: fullscreen
---
