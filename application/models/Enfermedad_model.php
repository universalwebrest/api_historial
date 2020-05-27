<?php

class Enfermedad_model extends CI_Model
{
    
    public function __construct(){
        parent::__construct();
    }
    
    public function getAll() {
                
        $query = $this->db->get('enfermedad');
        
        if (!is_null($query) && $query->num_rows() >0){
            
            foreach ($query->result() as $enfermedad) {
                $enfermedad->tipos = $this->tipos_enfermedad_model->get($enfermedad->id);
            }
            
            return $query->result();
            
        }else{
            return NULL;
        }
        
    }
    
    public function get($id){
        
        $this->db->where('id', $id);
        
        $query = $this->db->get('enfermedad');
        
        if (!is_null($query) && $query->num_rows()==1){
            
            $query->row()->tipos = $this->tipos_enfermedad_model->get($id);
                                                
            return $query->row();
            
        }else{
            return NULL;
        }
    }
    
    public function save() {
        $enfermedad = $this->post('enfermedad');
        
        $data = array('enfermedad' => $enfermedad);
        
        $query = $this->db->insert('enfermedad', $data);
        
        if ($query && $this->db->affected_rows()==1){
            
            return TRUE;
        }else{
            
            return FALSE;
        }
    }
    
    public function update() {
        $data = $this->post('data');        
        
        if ($this->db->field_exists($data['campo'], 'enfermedad')) {
            
            $this->db->set($data['campo'], $data['nuevo_valor']);
            
            $this->db->where('id', $data['id']);
            
            $query = $this->db->update('enfermedad');
            
            if ($query && $this->db->affected_rows()==1) {
                return TRUE;
            }
            else{
                return FALSE;
            }
        }
        else{
            
            return FALSE;
        }
        
    }
}

