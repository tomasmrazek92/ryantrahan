"use strict";(()=>{$(document).ready(function(){gsap.registerPlugin(ScrollTrigger,CustomEase),CustomEase.create("primary","0.51, 0, 0.08, 1"),gsap.defaults({ease:"primary"});function a(t){return{trigger:t,start:"top bottom",end:"bottom top",scrub:1,markers:!0}}function s(t){let r=$(window).width()>991?gsap.utils.random(10,20):gsap.utils.random(3,5);gsap.timeline({scrollTrigger:a(t)}).from(t,{rotate:0,y:`${r}vh`,ease:"power1.in"})}$("[data-tag]").each(function(){s($(this))}),$("[data-visual]").each(function(){let t=$(this);gsap.timeline({scrollTrigger:{trigger:t,start:"top bottom",end:"top top",scrub:1}}).from(t,{rotate:0,ease:"power1.in"})}),$(".hp_video").each(function(){let t=$(this);gsap.timeline({scrollTrigger:{trigger:t,start:"top bottom",end:"top top",scrub:1}}).fromTo(t,{width:"100%",borderRadius:"4rem"},{width:"100vw",borderRadius:"0rem"})}),$(".hp_brands-box").each(function(){let t=$(this).find(".hp_brands-text-wrap"),r=$(this).find(".hp_brands-plus"),o=$(this).find(".hp_brands-sol"),i=$(this).find(".hp_brands_visual"),e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"center bottom"}});e.from(t.eq(0),{rotate:0,y:"2rem",opacity:0,duration:.7}),e.from(r,{opacity:0},"-=0.3"),e.from(t.eq(1),{rotate:0,y:"2rem",opacity:0},"-=0.1"),e.from(o,{opacity:0},"-=0.3"),e.from(i.eq(0),{rotate:0,opacity:0},"-=0.2"),e.from(t.eq(2),{rotate:0,y:"2rem",opacity:0},"-=0.3"),e.from(i.eq(1),{opacity:0},"<")}),$(".hp_brands-card-box").each(function(){let t=$(this).find(".hp_brands-card"),r=$(this).find(".hp_brands_logo"),o=gsap.timeline({scrollTrigger:{trigger:$(this),start:"20% bottom"}});o.from(t,{opacity:0,scale:.9,stagger:.2}),o.from(r,{y:"2rem",opacity:0,stagger:.2},"<0.3")}),$(".section_hp-candy").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this).find(".hp_candy_photo-wrap"),start:"top bottom",end:"top center",scrub:1}});$(this).find(".hp_candy_visual").each(function(){t.from($(this),{rotate:0,y:`${gsap.utils.random(10,40)}vh`,ease:"power1.in"},"<")})}),$(".hp_candy-bottom-shape-wrap").each(function(){gsap.timeline({scrollTrigger:{trigger:$(this),start:"bottom bottom"}}).from($(this).find(".hp_candy-bottom_visual img"),{yPercent:100,stagger:.2})})});})();
