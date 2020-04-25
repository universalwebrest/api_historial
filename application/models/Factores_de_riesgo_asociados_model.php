<?php

class Factores_de_riesgo_asociados_model extends CI_Model
{
    private $mytable;
    
    public function __construct() {
        parent::__construct();
        $this->mytable = 'factores_de_riesgo_asociados';
    }
    
    public function get($id) {
        
        $data = array('id' => $id);
        
        $query = $this->db->get_where($this->mytable, $data);
        
        if (!is_null($query) && $query->num_rows()==1)
        {
            return $query->row();
        }
        else
        {
            return NULL;
        }        
    }
    
    public function save($id){
        
        $data = array('id' => $id);
        
        $query = $this->db->insert($this->mytable, $data);
        
        if ($query && $this->db->affected_rows()==1){
            
            return TRUE;
        }else{
            
            return FALSE;
        }
        
    }
    
    public function update($id, $data) {
        $campo = $data['campo'];
        
        if ($this->db->field_exists($campo, $this->mytable)) {
            
            $this->db->set($campo, $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $query = $this->db->update($this->mytable);
            
            if ($query && $this->db->affected_rows()==1) {
                return TRUE;
            }
            else {
                return FALSE;
            }
            
        }else {
            
            return FALSE;
        }
    }
    
}

