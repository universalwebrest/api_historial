<?php

class Diagnosticos_model extends CI_Model
{
    private $mytable;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->mytable = 'diagnosticos';
    }
    
    public function get($id) {
        
        $query = $this->db->get_where($this->mytable, array('id'=>$id));
        
        if ((!is_null($query)) && ($query->num_rows()==1))
        {
            return $query->row();
        }
        else
        {
            return NULL;
        }
    }
    
    public function save($id) {
        
        $this->db->set('id', $id);
        
        $this->db->insert($this->mytable);
                
        if ($this->db->affected_rows() == 1) 
        {
            return TRUE;
        }        
        else {
            return FALSE;        
        }
    }
    
    public function update($id, $data) {
        
        $campo = $data['campo'];
        
        if ($this->db->field_exists($campo, $this->mytable)){
            
            $this->db->set($campo, $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $this->db->update($this->mytable);
            
            if ($this->db->affected_rows() == 1)
            {
                return TRUE;
            }
        }
        else
        {
            return FALSE;
        }
        
    }
    
}

