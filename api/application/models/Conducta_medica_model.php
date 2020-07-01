<?php

class Conducta_medica_model extends CI_Model
{
    private $mytable;
    
    public function __construct(){
        parent::__construct();
        $this->mytable = 'conducta_medica';
    }
    
    public function get($id_historial){
        
        $this->db->where('id_historial', $id_historial);
        
        $query = $this->db->get($this->mytable);
        
        if (!is_null($query) && $query->num_rows()>=1){
            $conductas = $query->result();            
            foreach ($conductas as $conducta) {
                $conducta->id = (int)$conducta->id;
                $conducta->fecha = Util::convert_date_format($conducta->fecha);
                $conducta->id_historial = (int)$conducta->id_historial;                
            }            
            return $conductas;
        }else{
            return NULL;
        }
    }
    
    public function save($id_historial) {
        
        $data = array('id_historial' => $id_historial);
        
        $query = $this->db->insert($this->mytable, $data);
        
        if ($query && $this->db->affected_rows()==1){
            
            return TRUE;
        }else{
            
            return FALSE;
        }
    }
    
    public function update($id, $data) {
        
        if ($this->db->field_exists($data['campo'], $this->mytable)) {
            
            $this->db->set($data['campo'], $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $query = $this->db->update($this->mytable);
            
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

