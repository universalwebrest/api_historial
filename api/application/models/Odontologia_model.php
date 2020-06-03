<?php

class Odontologia_model extends CI_Model
{
    private $mytable;
    
    public function __construct() {
        parent::__construct();
        $this->mytable = 'odontologia';
    }
    
    public function get($id) {
        
        $this->db->where('id', $id);
        
        $query = $this->db->get($this->mytable);
        
        if (!is_null($query) && $query->num_rows()==1) {
            
            return $query->row();
        }
        else {
            
            return NULL;
        }        
    }
    
    public function save($id) {
        
        $this->db->set('id', $id);
        
        $query = $this->db->insert($this->mytable);
        
        if ($query && $this->db->affected_rows()==1) {
            return $id;
        }
        else
            return $this->db->error();
        
    }
    
    public function update($id, $data) {
        
        $campo = $data['campo'];
        
        if ($this->db->field_exists($campo, $this->mytable)) {
            
            $this->db->set($campo, $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $query = $this->db->update($this->mytable);
            
            if ($query && $this->db->affected_rows()==1) {
                return $id;
            }
            else {
                return $this->db->error(); 
            }
        }
        
    }
    
}

