"use strict";(()=>{gsap.registerPlugin(ScrollTrigger,CustomEase);CustomEase.create("primary","0.51, 0, 0.08, 1");gsap.defaults({ease:"primary"});function c(e){return{trigger:e,start:"top bottom",end:"bottom top",scrub:1}}function d(e){let t=$(window).width()>991?gsap.utils.random(10,20):gsap.utils.random(3,5);gsap.timeline({scrollTrigger:c(e)}).to(e,{rotate:0,y:`-${t}vh`,ease:"power1.in"})}$("[data-tag]").each(function(){d($(this))});$("[data-visual]").each(function(){let e=$(this),r=$(this).attr("data-visual")==="left"?gsap.utils.random(5,10):gsap.utils.random(-5,-10);gsap.timeline({scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",scrub:1}}).from(e,{rotate:r},{rotate:r,ease:"power1.in"})});$('[data-reveal="parallax"]').each(function(){let e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top bottom",end:"top center",scrub:1}});$(this).find('[data-reveal="item"]').each(function(){e.from($(this),{rotate:0,y:`${gsap.utils.random(10,40)}vh`,ease:"power1.in"},"<")})});$('[data-animation="stagger"]').each(function(){let e=$(this).find('[data-animation="item"]'),t=$(this).find('[data-animation="overlay"]'),r=gsap.timeline({scrollTrigger:{trigger:$(this),start:"20% bottom"}});r.from(e,{opacity:0,scale:.9,stagger:.1}),r.from(t,{y:"2rem",opacity:0,stagger:.1},"<0.3")});CustomEase.create("bounce","M0,0,C0,0,0.107,-0.004,0.14,-0.002,0.16,-0.001,0.543,-0.02,0.581,0.423,0.634,0.661,0.67,1.03,0.67,1.03,0.67,1.423,0.856,1.163,0.858,1.162,0.861,1.161,1,1,1,1");$('[data-split="heading"]').each(function(){let e=SplitType.create($(this),{types:"words"}),t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"bottom bottom"}});$(this).find(".word").each(function(){$(this).closest(".stroke-heading").length>0?(t.from($(this),{opacity:0},"<"),t.fromTo($(this),{scale:0,rotate:0},{scale:1,rotate:gsap.utils.random(-3,3,1),duration:.2,ease:"back.out(1.7)"},"<")):t.from($(this),{yPercent:40,opacity:0,duration:.1,stagger:.1})})});ScrollTrigger.matchMedia({"(min-width: 992px)":function(){$(".partnership_brands-wrap").each(function(){let e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",end:"bottom top",scrub:1}}),t=$(this).find(".partnership_brands_visual");e.fromTo([$(this).find("h2")],{opacity:0,yPercent:100},{keyframes:{"15%":{opacity:1,yPercent:0}},duration:.5},"<"),e.from(t.eq(0),{x:"20vw",rotate:"0deg"},"<0.05").from(t.eq(1),{x:"10vw",rotate:"0deg"},"<").from(t.eq(2),{x:"-10vw",rotate:"0deg"},"<").from(t.eq(3),{x:"-20vw",rotate:"0deg"},"<"),e.fromTo([t],{opacity:0},{keyframes:{"30%":{opacity:1}},duration:.5},"<")})},"(min-width: 480px) and (max-width: 991px)":function(){$(".partnership_brands-wrap").each(function(){let e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",end:"bottom top",scrub:1}}),t=$(this).find(".partnership_brands_visual");e.fromTo([$(this).find("h2")],{opacity:0,yPercent:100},{keyframes:{"15%":{opacity:1,yPercent:0}},duration:.5},"<"),e.from(t.eq(0),{x:"10vw",rotate:"0deg"},"<0.05").from(t.eq(1),{x:"-10vw",rotate:"0deg"},"<").from(t.eq(2),{x:"10vw",rotate:"0deg"},"<").from(t.eq(3),{x:"-10vw",rotate:"0deg"},"<"),e.fromTo([t],{opacity:0},{keyframes:{"30%":{opacity:1}},duration:.5},"<")})},"(max-width: 479px)":function(){gsap.timeline({scrollTrigger:{trigger:$(".partnership_brands-wrap"),start:"top 80%",end:"center bottom",scrub:1}}).fromTo($(".partnership_brands-wrap").find("h2"),{opacity:0,yPercent:100},{keyframes:{"15%":{opacity:1,yPercent:0}},duration:.5},"<"),$(".partnership_brands_visual").each(function(){gsap.timeline({scrollTrigger:{trigger:$(this),start:"top bottom",end:"bottom 80%",scrub:1}}).from($(this),{yPercent:30,rotate:"0deg",opacity:0},"<0.05")})},all:function(){}});$(".joyride_video-bottom-card").each(function(){let e=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 100%",end:"bottom 80%",scrub:1}}),t=$(this).find(".joyride_video-card_visual"),r=$(this).find(".joyride_vide-card-title"),a=t.hasClass("left");e.from(r,{opacity:0}),e.from(t,{xPercent:a?30:-30,opacity:0,rotate:0},"<")});$(".joyride_hero_wrap").each(function(){let e=$(this).find(".joyride_hero-visual_img"),t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top bottom",end:"top center",scrub:1}});t.from(e.eq(0),{xPercent:200,rotate:"10deg"}),t.from(e.eq(1),{yPercent:100},"<"),t.from(e.eq(2),{xPercent:-200,rotate:"10deg"},"<")});interact("[data-draggable]").draggable({inertia:!0,modifiers:[interact.modifiers.restrictRect({restriction:".footer-wrap",endOnly:!0})],listeners:{move:s}});function s(e){var{target:t}=e,r=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,a=(parseFloat(t.getAttribute("data-y"))||0)+e.dy,n=parseFloat(t.getAttribute("data-rotation"))||0,i=15,l=e.dx/10,o=n+l;o=Math.max(-i,Math.min(i,o)),t.style.transform="translate("+r+"px, "+a+"px) rotate("+o+"deg)",t.setAttribute("data-x",r),t.setAttribute("data-y",a),t.setAttribute("data-rotation",o)}window.dragMoveListener=s;$(".section_footer").each(function(){let e=$(this).find(".footer_card-wrap"),t=$(this).find(".footer-wrap_button-block"),r=$(this).find(".footer_socila-link"),a=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",end:"bottom bottom",scrub:1}});a.from(e.eq(0),{y:"20vh",rotate:"20deg"}).from(e.eq(1),{y:"20vh",x:"-20vw",rotate:"15deg"},"<").from(t.eq(0),{y:"20vh",rotate:"20deg"},"<").from(t.eq(1),{y:"20vh",rotate:"-20deg"},"<").from(t.eq(2),{y:"20vh",rotate:"-60deg"},"<").from(r.eq(0),{y:"20vh",x:"20vw"},"<").from(r.eq(1),{y:"20vh"},"<"),a.fromTo([e,t,r],{opacity:0},{keyframes:{"35%":{opacity:1}},duration:.5},"<")});})();
