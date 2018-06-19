function ob_OnNodeDrop(src, dst, copy)
{    
	if ( typeof(ess_ob_OnNodeDrop) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeDrop(src, dst, copy);

		if ( !f_ret )
			return;
	}

    // add client side code here	
    //alert("Node with id:" + src + " was " + (!copy ? "moved" : "copied") + " to node with id:" + dst);
    	   
	if(ob_ev("OnNodeDrop"))
	{
		if(document.getElementById(dst).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			dst = "root";
		} 
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("src", src);
	        ob_post.AddParam("dst", dst);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeDrop");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}
}

function ob_OnNodeDropOutside(dst)
{    
	if ( typeof(ess_ob_OnNodeDropOutside) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeDropOutside(dst);

		if ( !f_ret )
			return;
	}
    
    ob_t2_CopyToControl(dst); // comment this line if you don't want to drop nodes into textboxes
    
    if(ob_ev("OnNodeDropOutside"))
	{
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("dst", dst);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeDropOutside");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}
}  


function ob_OnNodeSelect(id)
{       
	if ( typeof(ess_ob_OnNodeSelect) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeSelect(id);

		if ( !f_ret )
			return;
	}
	 
	 if(ob_ev("OnNodeSelect"))
	 {	    
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		} 
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("process_edit.aspx", "OnNodeSelect");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	 }
}

function ob_OnNodeEdit(id, text, prevText)
{    
	if ( typeof(ess_ob_OnNodeEdit) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeEdit(id, text, prevText);

		if ( !f_ret )
			return;
	}
		
	if(ob_ev("OnNodeEdit"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);
	        ob_post.AddParam("text", text);
	        ob_post.AddParam("prevText", prevText);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeEdit");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	} 
}

function ob_OnAddNode(parentId, childId, textOrHTML, expanded, image, subTreeURL)
{    
	if ( typeof(ess_ob_OnAddNode) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnAddNode(parentId, childId, textOrHTML, expanded, image, subTreeURL);

		if ( !f_ret )
			return;
	}
    
	if(ob_ev("OnAddNode"))
	{
		if(document.getElementById(parentId).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			parentId = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("parentId", parentId);
	        ob_post.AddParam("childId", childId);
	        ob_post.AddParam("textOrHTML", textOrHTML);
	        ob_post.AddParam("expanded", expanded ? expanded : 0);
	        ob_post.AddParam("image", image ? image : "");
	        ob_post.AddParam("subTreeURL", subTreeURL ? subTreeURL : "");
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnAddNode");
	    } 		
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	}
}

function ob_OnRemoveNode(id)
{    
	if ( typeof(ess_ob_OnRemoveNode) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnRemoveNode(id);

		if ( !f_ret )
			return;
	}
	 	 
	 if(ob_ev("OnRemoveNode"))
	 {		
	    if(typeof ob_post == "object")
	    {			
	        ob_post.AddParam("id", id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnRemoveNode");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	 }
}

function ob_OnNodeExpand(id, dynamic)
{
	if ( typeof(ess_ob_OnNodeExpand) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeExpand(id, dynamic);

		if ( !f_ret )
			return;
	}
        
    if(ob_ev("OnNodeExpand"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeExpand");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}		
}

function ob_OnNodeCollapse(id)
{
	if ( typeof(ess_ob_OnNodeCollapse) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnNodeCollapse(id);

		if ( !f_ret )
			return;
	}
	
    if(ob_ev("OnNodeCollapse"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeCollapse");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}		
}

function ob_OnMoveNodeUp(node_up_id, node_down_id)
{
	if ( typeof(ess_ob_OnMoveNodeUp) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnMoveNodeUp(node_up_id, node_down_id);

		if ( !f_ret )
			return;
	}
	
    if(ob_ev("OnMoveNodeUp"))
	{		
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("node_up_id", node_up_id);
	        ob_post.AddParam("node_down_id", node_down_id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnNodeMoveUp");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}		
}

function ob_OnMoveNodeDown(node_down_id, node_up_id)
{
	if ( typeof(ess_ob_OnMoveNodeDown) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnMoveNodeDown(node_down_id, node_up_id);

		if ( !f_ret )
			return;
	}
	
    if(ob_ev("OnMoveNodeDown"))
	{		
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("node_down_id", node_down_id);
	        ob_post.AddParam("node_up_id", node_up_id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnMoveNodeDown");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}		
}

/*
	Pre-events.
	Use them to implement your own validation for such operations as add, remove, edit
*/

function ob_OnBeforeAddNode(parentId, childId, textOrHTML, expanded, image, subTreeURL)
{        
	if ( typeof(ess_ob_OnBeforeAddNode) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeAddNode(parentId, childId, textOrHTML, expanded, image, subTreeURL);

		if ( !f_ret )
			return f_ret;
	}

	if(ob_ev("OnBeforeAddNode"))
	{
		if(document.getElementById(parentId).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			parentId = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("parentId", parentId);
	        ob_post.AddParam("childId", childId);
	        ob_post.AddParam("textOrHTML", textOrHTML);
	        ob_post.AddParam("expanded", expanded ? expanded : 0);
	        ob_post.AddParam("image", image ? image : "");
	        ob_post.AddParam("subTreeURL", subTreeURL ? subTreeURL : "");
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeAddNode");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	} 	
	return true;
}

function ob_OnBeforeRemoveNode(id)
{    
	if ( typeof(ess_ob_OnBeforeRemoveNode) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeRemoveNode(id);

		if ( !f_ret )
			return f_ret;
	}

	if(ob_ev("OnBeforeRemoveNode"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeRemoveNode");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	}
	return true;
}

function ob_OnBeforeNodeEdit(id)
{    
	if ( typeof(ess_ob_OnBeforeNodeEdit) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeEdit(id);

		if ( !f_ret )
			return f_ret;
	}

	if(ob_ev("OnBeforeNodeEdit"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeEdit");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	}
	return true;
}

function ob_OnBeforeNodeSelect(id)
{    
	if ( typeof(ess_ob_OnBeforeNodeSelect) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeSelect(id);

		if ( !f_ret )
			return f_ret;
	}
	
	if(ob_ev("OnBeforeNodeSelect"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeSelect");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    } 
	}
	return true;
}

function ob_OnBeforeNodeDrop(src, dst, copy)
{    
	if ( typeof(ess_ob_OnBeforeNodeDrop) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeDrop(src, dst, copy);

		if ( !f_ret )
			return f_ret;
	}
	
	if(ob_ev("OnBeforeNodeDrop"))
	{
		if(document.getElementById(dst).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			dst = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("src", src);
	        ob_post.AddParam("dst", dst);
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeDrop");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}	
	return true;
}

function ob_OnBeforeNodeDrag(id)
{    
	if ( typeof(ess_ob_OnBeforeNodeDrag) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeDrag(id);

		if ( !f_ret )
			return f_ret;
	}
	
	if(ob_ev("OnBeforeNodeDrag"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeDrag");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}	
	return true;
}


function ob_OnBeforeNodeDropOutside(dst)
{    
	if ( typeof(ess_ob_OnBeforeNodeDropOutside) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeDropOutside(dst);

		if ( !f_ret )
			return f_ret;
	}

    if(ob_ev("OnBeforeNodeDropOutside"))
	{
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("dst", dst);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeDropOutside");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}
	
	return true;
} 

function ob_OnBeforeNodeExpand(id, dynamic)
{
	if ( typeof(ess_ob_OnBeforeNodeExpand) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeExpand(id, dynamic);

		if ( !f_ret )
			return f_ret;
	}

    if(ob_ev("OnBeforeNodeExpand"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeExpand");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}	
	
	return true;	
}

function ob_OnBeforeNodeCollapse(id)
{
	if ( typeof(ess_ob_OnBeforeNodeCollapse) == 'function' )
	{
		var f_ret = true;
		f_ret = ess_ob_OnBeforeNodeCollapse(id);

		if ( !f_ret )
			return f_ret;
	}

    if(ob_ev("OnBeforeNodeCollapse"))
	{
		if(document.getElementById(id).parentNode.parentNode.firstChild.firstChild.className == "ob_t8") {
			id = "root";
		}
	    if(typeof ob_post == "object")
	    {
	        ob_post.AddParam("id", id);	        
	        //Change "TreeEvents.aspx" with the name of your server-side processing file
	        ob_post.post("TreeEvents.aspx", "OnBeforeNodeCollapse");
	    }
	    else
	    {
	        alert("Please add obout_AJAXPage control to your page to use the server-side events");
	    }
	}	
	
	return true;
}
