<?php

class Historial_model extends CI_Model
{
    private $mytable;
    
    public function __construct()
    {
        parent::__construct();
        $this->mytable = 'historial';
    }
    
    public function get($id)
    {                
        $historial = $this->db->get_where('historial', array('id' => $id));
        
        if ($historial->num_rows() == 1)
        {   
            return $historial->row();
        }
        else
        {
            return null;
        }        
    }
    
    public function save($id, $hospital_id)
    {
        $this->db->set(array('id'=>$id, 'hospital_id'=>$hospital_id));
        
        $this->db->insert('historial');
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        else{
            return FALSE;
        }
    }
    
    public function update($id, $data) {
        
        $campo = $data['campo'];
        
        $nuevo_valor = $data['nuevo_valor'];
        
        if ($this->db->field_exists($campo, $this->mytable)) {
            
            $this->db->set($campo, $nuevo_valor);
            
            $this->db->where('id', $id);
            
            $this->db->update($this->mytable);
            
            if ($this->db->affected_rows()==1) {
                return TRUE;
            }
        }
        else{
            return FALSE;
        }
    }
        
}

