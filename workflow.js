
    (()=>{
      const root=document.getElementById('we-flow-console');
      const map=root.querySelector('.wf-map');
      const steps=Array.from(root.querySelectorAll('.wf-step'));
      const labels=['MEDIA INTAKE','NONDESTRUCTIVE EDITS','DESCRIPTION PREP','HUMAN APPROVAL','LOCAL RENDERING','EXPLICIT HANDOFF'];
      const details=[
        'Share photos/videos and supplied text into Studio, or select downloaded files. This does not fetch an entire WhatsApp group automatically.',
        'The editor scrolls to crop controls. Crop photos, crop/trim video, or adjust photo perspective/flips; Undo keeps the original recoverable.',
        'Use the supplied facts to prepare a description, or read image text with local OCR. Finished wording can be preserved and saved as a local example.',
        'Verify the sighting facts, edit if needed, then explicitly approve. The app never invents approval or publishes by itself.',
        'Android renders the branded image or video on the reviewing phone. After successful generation, the app scrolls to Share to Instagram.',
        'Save exports to Gallery, hand selected files to Instagram, or explicitly send to Telegram. A person checks the carousel and completes publication.'
      ];
      let current=3;
      function draw(){
        const bounds=map.getBoundingClientRect();
        root.querySelectorAll('[data-link]').forEach((line,i)=>{
          const a=steps[i].getBoundingClientRect(),b=steps[i+1].getBoundingClientRect();
          const vertical=Math.abs((a.top+a.bottom)/2-(b.top+b.bottom)/2)>a.height*.6;
          let x1,y1,x2,y2;
          if(vertical){x1=(a.left+a.right)/2-bounds.left;y1=a.bottom-bounds.top+7;x2=(b.left+b.right)/2-bounds.left;y2=b.top-bounds.top-7;}
          else{const right=b.left>a.left;x1=(right?a.right:a.left)-bounds.left+(right?7:-7);y1=(a.top+a.bottom)/2-bounds.top;x2=(right?b.left:b.right)-bounds.left+(right?-7:7);y2=(b.top+b.bottom)/2-bounds.top;}
          line.setAttribute('d','M'+x1+' '+y1+'L'+x2+' '+y2);line.classList.toggle('wf-passed',i<current);
        });
      }
      function show(index,remember){
        current=index;steps.forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));
        root.querySelector('#wf-stage-label').textContent=labels[index];root.querySelector('#wf-stage-detail').textContent=details[index];
        requestAnimationFrame(draw);
      }
      steps.forEach((el,index)=>el.addEventListener('click',()=>show(index,true)));
      new ResizeObserver(draw).observe(map);
      show(current,false);
    })();
  