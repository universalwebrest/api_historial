<?php

class Factores_de_riesgo_asociados_model extends CI_Model
{
    public function __construct() {
        parent::__construct();
    }
    
    public function get($id) {
        
        $data = array('id' => $id);
        
        $query = $this->db->get_where('factores_de_riesgo_asociados', $data);
        
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
        
        $query = $this->db->insert('factores_de_riesgo_asociados', $data);
        
        if ($query && $this->db->affected_rows()==1){
            return TRUE;
        }else{
            return FALSE;
        }
        
    }
    
}

